# Node.js 빌드 스테이지
FROM node:18-alpine as builder

WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 프로덕션 빌드
RUN npm run build

# Nginx 서빙 스테이지
FROM nginx:alpine

# 커스텀 nginx 설정 복사
COPY deployment/container/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일을 nginx html 디렉토리로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# 환경변수 설정 스크립트 복사 및 실행 권한 부여
COPY deployment/container/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# 기본 runtime-env.js 복사
COPY public/runtime-env.js /usr/share/nginx/html/runtime-env.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]