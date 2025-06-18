pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22' // Jenkins에 등록한 NodeJS 이름
    }

    environment {
        ANDROID_HOME = '/opt/android-sdk' // Android SDK 경로 설정
        JAVA_HOME = '/usr/lib/jvm/java-17-openjdk-amd64' // Java 홈 설정
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
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Android Build') {
            steps {
                sh 'npm install -g expo-cli'
                sh 'expo run:android'
            }
        }

    }

    post {
        failure {
            echo '빌드 실패!'
        }
        success {
            echo '빌드 성공!'
        }
    }
}