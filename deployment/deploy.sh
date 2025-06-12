#!/bin/bash

set -e

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수들
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# 필수 환경변수 확인
check_env_vars() {
    local missing_vars=()
    
    if [ -z "$RESOURCE_GROUP" ]; then missing_vars+=("RESOURCE_GROUP"); fi
    if [ -z "$ACR_NAME" ]; then missing_vars+=("ACR_NAME"); fi
    if [ -z "$CLUSTER_NAME" ]; then missing_vars+=("CLUSTER_NAME"); fi
    if [ -z "$NAMESPACE" ]; then missing_vars+=("NAMESPACE"); fi
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        log_error "다음 환경변수를 설정해주세요:"
        printf '%s\n' "${missing_vars[@]}"
        echo ""
        echo "설정 예시:"
        echo "export RESOURCE_GROUP=rg-digitalgarage-03"
        echo "export ACR_NAME=your-acr-name"
        echo "export CLUSTER_NAME=aks-digitalgarage-03"
        echo "export NAMESPACE=ns-hiorder"
        exit 1
    fi
}

# 환경변수 기본값 설정
INGRESS_HOST=${INGRESS_HOST:-20.249.191.180}
IMAGE_NAME=${IMAGE_NAME:-hi-frontend}
IMAGE_TAG=${IMAGE_TAG:-latest}

echo -e "${YELLOW}🚀 Frontend 배포 시작${NC}"
echo "================================================================"
echo "RESOURCE_GROUP: $RESOURCE_GROUP"
echo "ACR_NAME: $ACR_NAME"
echo "CLUSTER_NAME: $CLUSTER_NAME"
echo "NAMESPACE: $NAMESPACE"
echo "INGRESS_HOST: $INGRESS_HOST (고정값)"
echo "IMAGE_NAME: $IMAGE_NAME"
echo "IMAGE_TAG: $IMAGE_TAG"
echo "================================================================"

# 필수 환경변수 확인
check_env_vars

# Azure 로그인 확인
log_info "Azure 로그인 상태 확인 중..."
if ! az account show > /dev/null 2>&1; then
    log_error "Azure에 로그인이 필요합니다: az login"
    exit 1
fi
log_success "Azure 로그인 확인됨"

# ACR 로그인 서버 가져오기
log_info "ACR 정보 확인 중..."
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --resource-group $RESOURCE_GROUP --query loginServer --output tsv)
if [ -z "$ACR_LOGIN_SERVER" ]; then
    log_error "ACR 정보를 가져올 수 없습니다. ACR_NAME과 RESOURCE_GROUP을 확인해주세요."
    exit 1
fi
export ACR_LOGIN_SERVER
log_success "ACR Login Server: $ACR_LOGIN_SERVER"

# ACR 로그인
log_info "ACR에 로그인 중..."
if ! az acr login --name $ACR_NAME; then
    log_error "ACR 로그인 실패"
    exit 1
fi
log_success "ACR 로그인 완료"

# Docker 이미지 빌드
log_info "Docker 이미지 빌드 중..."
FULL_IMAGE_NAME="$ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG"
if ! docker build -t $FULL_IMAGE_NAME -f deployment/container/Dockerfile .; then
    log_error "Docker 빌드 실패"
    exit 1
fi
log_success "Docker 이미지 빌드 완료: $FULL_IMAGE_NAME"

# Docker 이미지 푸시
log_info "Docker 이미지를 ACR에 푸시 중..."
if ! docker push $FULL_IMAGE_NAME; then
    log_error "Docker 이미지 푸시 실패"
    exit 1
fi
log_success "Docker 이미지 푸시 완료"

# latest 태그도 함께 푸시
LATEST_IMAGE_NAME="$ACR_LOGIN_SERVER/$IMAGE_NAME:latest"
log_info "latest 태그 이미지 푸시 중..."
docker tag $FULL_IMAGE_NAME $LATEST_IMAGE_NAME
if ! docker push $LATEST_IMAGE_NAME; then
    log_warning "latest 태그 푸시 실패 (무시하고 계속 진행)"
else
    log_success "latest 태그 이미지 푸시 완료"
fi

# AKS 자격증명 가져오기
log_info "AKS 자격증명 가져오는 중..."
if ! az aks get-credentials --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME --overwrite-existing; then
    log_error "AKS 자격증명 가져오기 실패"
    exit 1
fi
log_success "AKS 자격증명 설정 완료"

# 네임스페이스 생성
log_info "네임스페이스 생성/확인 중..."
if ! kubectl apply -f deployment/k8s/namespace.yaml; then
    log_error "네임스페이스 생성 실패"
    exit 1
fi
log_success "네임스페이스 준비 완료"

# Kubernetes 배포
log_info "Kubernetes에 배포 중..."
if ! envsubst < deployment/k8s/deployment.yaml | kubectl apply -f -; then
    log_error "Kubernetes 배포 실패"
    exit 1
fi
log_success "Kubernetes 배포 완료"

# 배포 상태 확인
log_info "배포 완료 대기 중... (최대 5분)"
if ! kubectl rollout status deployment/hi-frontend -n $NAMESPACE --timeout=300s; then
    log_error "배포 완료 대기 시간 초과"
    log_info "현재 Pod 상태:"
    kubectl get pods -n $NAMESPACE -l app=hi-frontend
    kubectl describe pods -n $NAMESPACE -l app=hi-frontend
    exit 1
fi

log_success "Frontend 배포 완료!"
echo ""
echo "================================ 배포 상태 ================================"
echo "📦 Pods:"
kubectl get pods -n $NAMESPACE -l app=hi-frontend
echo ""
echo "🔗 Services:"
kubectl get svc -n $NAMESPACE
echo ""
echo "🌐 Ingress:"
kubectl get ingress -n $NAMESPACE
echo ""
echo "================================================================"
log_success "🌐 접속 주소: http://$INGRESS_HOST/frontend"
log_success "🌐 메인 접속: http://$INGRESS_HOST/"
log_info "📋 배포 로그 확인: kubectl logs -n $NAMESPACE -l app=hi-frontend"