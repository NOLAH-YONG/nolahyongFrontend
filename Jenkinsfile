pipeline {
    agent any

    tools {
        nodejs 'NodeJS 24.2.0' // Jenkins에 등록한 NodeJS 이름
    }

    environment {
        REMOTE_HOST = 'localhost'
        REMOTE_PORT = '2222'
        REMOTE_USER = 'ubuntu'
        DEPLOY_PATH = '/var/www/html'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'tour_admin',
                    branch: 'main',
                    url: 'https://github.com/NOLAH-YONG/nolahyongFrontend.git'
            }
        }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --coverage'
            }
            post {
                always {
                    junit 'junit.xml'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npx react-native bundle --platform android --dev false --entry-file index.tsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/'
            }
        }
    }

    post {
        failure {
            // 실패 시 알림 등
            echo '빌드 실패!'
        }
    }
}