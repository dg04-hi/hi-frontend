#!/bin/bash

set -e

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로고 출력
echo -e "${BLUE}"
echo "██╗  ██╗██╗      ███████╗██████╗  ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗██████╗ "
echo "██║  ██║██║      ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║██╔══██╗"
echo "███████║██║█████╗█████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║██║  ██║"
echo "██╔══██║██║╚════╝██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║██║  ██║"
echo "██║  ██║██║      ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║██████╔╝"
echo "╚═╝  ╚═╝╚═╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚═════╝ "
echo -e "${NC}"

# 필수 환경변수 확인
check_env_vars() {
    local missing_vars=()
    
    if [ -z "$RESOURCE_GROUP" ]; then missing_vars+=("RESOURCE_GROUP"); fi
    if [ -z "$ACR_NAME" ]; then missing_vars+=("ACR_NAME"); fi
    if [ -z "$CLUSTER_NAME" ]; then missing_vars+=("CLUSTER_NAME"); fi
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        echo -e "${RED}❌ 다음 환경변수를 설정해주세요:${NC}"
        printf '%s\n' "${missing_vars[@]}"
        echo ""
        echo "설정 예시:"
        echo "export RESOURCE_GROUP=rg-digitalgarage-03"
        echo "export ACR_NAME=your-acr-name"
        echo "export CLUSTER_NAME=aks-digitalgarage-03"
        exit 1
    fi
}

# 환경변수 기본값 설정
INGRESS_HOST=20.249.191.180  # 고정값
NAMESPACE=ns-hiorder
IMAGE_NAME=${IMAGE_NAME:-hi-frontend}
IMAGE_TAG=${IMAGE_TAG:-$(date +%Y%m%d-%H%M%S)}

echo -e "${YELLOW}🚀 Frontend 배포 시작${NC}"
echo "=================================="
echo "RESOURCE_GROUP: $RESOURCE_GROUP"
echo "ACR_NAME: $ACR_NAME"
echo "CLUSTER_NAME: $CLUSTER_NAME"
echo "INGRESS_HOST: $INGRESS_HOST"
echo "NAMESPACE: $NAMESPACE"
echo "IMAGE_NAME: $IMAGE_NAME"
echo "IMAGE_TAG: $IMAGE_TAG"
echo "=================================="

# 필수 환경변수 확인
check_env_vars

# ACR 로그인 서버 가져오기
echo -e "${YELLOW}📋 ACR 정보 확인 중...${NC}"
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query loginServer --output tsv)
export ACR_LOGIN_SERVER
echo "ACR Login Server: $ACR_LOGIN_SERVER"

# ACR 로그인
echo -e "${YELLOW}🔐 ACR에 로그인 중...${NC}"
az acr login --name $ACR_NAME

# Docker 이미지 빌드
echo -e "${YELLOW}🔨 Docker 이미지 빌드 중...${NC}"
docker build -t $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG -f deployment/container/Dockerfile .

# Docker 이미지 푸시
echo -e "${YELLOW}📤 Docker 이미지 푸시 중...${NC}"
docker push $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG

# latest 태그도 함께 푸시
docker tag $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG $ACR_LOGIN_SERVER/$IMAGE_NAME:latest
docker push $ACR_LOGIN_SERVER/$IMAGE_NAME:latest

# AKS 자격증명 가져오기
echo -e "${YELLOW}🔑 AKS 자격증명 가져오는 중...${NC}"
az aks get-credentials --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME --overwrite-existing

# 네임스페이스 생성
echo -e "${YELLOW}📁 네임스페이스 생성 중...${NC}"
kubectl apply -f deployment/k8s/namespace.yaml

# Kubernetes 배포
echo -e "${YELLOW}🚢 Kubernetes에 배포 중...${NC}"
envsubst < deployment/k8s/deployment.yaml | kubectl apply -f -

# 배포 상태 확인
echo -e "${YELLOW}⏳ 배포 완료 대기 중...${NC}"
kubectl rollout status deployment/hi-frontend -n $NAMESPACE --timeout=300s

echo -e "${GREEN}✅ Frontend 배포 완료!${NC}"
echo ""
echo "📊 배포 상태 확인:"
kubectl get pods -n $NAMESPACE -l app=hi-frontend -o wide
echo ""
echo "🌐 서비스 정보:"
kubectl get svc -n $NAMESPACE
echo ""
echo "🔗 Ingress 정보:"
kubectl get ingress -n $NAMESPACE
echo ""
echo -e "${GREEN}🎉 접속 주소: http://$INGRESS_HOST${NC}"
echo -e "${GREEN}🎉 Frontend 경로: http://$INGRESS_HOST/frontend${NC}"