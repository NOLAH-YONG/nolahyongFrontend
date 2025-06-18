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

        stage('React Native Bundle') {
            steps {
                // assets 디렉터리 생성
                sh 'mkdir -p android/app/src/main/assets'
                // JS 번들 생성
                sh 'npx react-native bundle --platform android --dev false --entry-file index.tsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/'
            }
        }

        stage('Android Build') {
            steps {
                dir('android') {
                    // gradlew 실행 권한 부여
                    sh 'chmod +x gradlew'
                    // 릴리즈 APK 빌드
                    sh './gradlew assembleRelease'
                }
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