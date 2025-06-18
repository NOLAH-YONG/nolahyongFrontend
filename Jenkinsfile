pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22' // Jenkins에 등록한 NodeJS 이름
    }

    environment {
        REMOTE_HOST = 'localhost'
        REMOTE_PORT = '2222'
        REMOTE_USER = 'ubuntu'
        DEPLOY_PATH = '/var/www/html'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git credentialsId: 'tour_admin',
                    branch: 'main',
                    url: 'https://github.com/NOLAH-YONG/nolahyongFrontend.git'
            }
        }

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

        stage('Build') {
            steps {
                sh 'npx react-native bundle --platform android --dev false --entry-file index.tsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/'
            }
        }
    }

    post {
        failure {
            echo '빌드 실패!'
        }
    }
}