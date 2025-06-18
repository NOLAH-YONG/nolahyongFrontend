pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NOLAH-YONG/nolahyongFrontend.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Metro Bundler') {
            steps {
                // 백그라운드로 개발 서버 실행 (CI에서는 주로 테스트용으로 활용)
                sh 'nohup npx expo start --no-interactive --clear > metro.log 2>&1 &'
            }
        }
    }

    post {
        success {
            echo '✅ 개발용 빌드(메트로 번들러) 실행 성공!'
        }
        failure {
            echo '❌ 개발용 빌드(메트로 번들러) 실행 실패!'
        }
    }
}
