#!/bin/sh

# 고정 INGRESS_HOST 사용 (백엔드 배포 후 동적으로 변경 가능)
INGRESS_HOST=${INGRESS_HOST:-20.249.191.180}

echo "Setting up runtime configuration with INGRESS_HOST: ${INGRESS_HOST}"

# runtime-env.js 파일 생성 (현재는 Mock API로 설정)
cat > /usr/share/nginx/html/runtime-env.js << EOF
window.__runtime_config__ = {
  AUTH_URL: 'http://${INGRESS_HOST}/auth',
  MEMBER_URL: 'http://${INGRESS_HOST}/member',
  STORE_URL: 'http://${INGRESS_HOST}/store', 
  REVIEW_URL: 'http://${INGRESS_HOST}/review',
  ANALYTICS_URL: 'http://${INGRESS_HOST}/analytics',
  RECOMMEND_URL: 'http://${INGRESS_HOST}/recommend'
};
EOF

echo "Runtime configuration file created successfully!"
echo "Configuration:"
cat /usr/share/nginx/html/runtime-env.js