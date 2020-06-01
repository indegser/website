# EOSDAQ, EOS 기반의 탈중앙화 거래소

[[ youtube url="https://youtu.be/8HddLy2cHaE" alt="EOSDAQ. (2018)" ]]

EOSDAQ에서는 React와 Redux, Redux Saga를 사용해 [EOS](http://wiki.hash.kr/index.php/%EC%9D%B4%EC%98%A4%EC%8A%A4) 기반의 탈중앙화 거래소를 만들었습니다.

# 처음 프론트엔드 개발자와 함께 일하다

EOSDAQ에서 처음으로 굵직한 개발 사안들을 함께 고민할 동료를 만났습니다. 두 사람의 경험과 성향 덕분에 우리는 다양한 시도를 프론트엔드에 적용해볼 수 있었습니다.

1. Redux-Saga와 WebSocket을 사용한 실시간 주가 업데이트
2. 한국, 중국, 영어를 대응하는 Locale 파일 작업 및 버젼 관리
3. 이벤트 배너 관리를 위한 CMS 연결

# Docker와 CI/CD를 경험하다

끊김없는 개발 경험을 중요시했던 CTO 덕분에 개발 초기부터 다양한 환경으로의 배포가 이루어질 수 있었습니다. EOSDAQ에서 구성한 프론트엔드 배포 환경은 아래와 같습니다.

1. GitLab에 소스가 변경될 때마다 [AWS CodeCommit](https://aws.amazon.com/codecommit/)이 이를 가져가 [CodePipeline](https://aws.amazon.com/codepipeline/)의 빌드 파이프라인이 실행됩니다.

2. 클라이언트 코드와 서버 코드는 각자 해당하는 빌드 과정을 거칩니다.

3. 클라이언트 빌드의 경우 컴파일된 코드들을 [S3](https://aws.amazon.com/s3/)에 업로드한 후 [CloudFront](https://aws.amazon.com/cloudfront/) 캐시를 무효화시킵니다.

4. 서버 빌드의 경우 [ECR](https://aws.amazon.com/ecr/)로 Docker 이미지를 업로드한 후 [ECS](https://aws.amazon.com/ecs/)가 자동으로 서비스를 업데이트합니다.

> 서비스들이 서로를 호출하는 엔드포인트나 암호화된 정보(API 키)들은 [KMS](https://aws.amazon.com/kms/)로 관리하여 빌드 과정에서 컨테이너에 주입되었습니다.
