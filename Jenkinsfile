pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22'
    }

    environment {
        ANDROID_HOME = '/opt/android-sdk' // 실제 SDK 경로로 수정
        JAVA_HOME = '/usr/lib/jvm/java-21-openjdk-amd64' // 실제 Java 21 경로로 수정
        PATH = "$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
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

        stage('Android Build') {
            steps {
                dir('android') {
                    sh 'chmod +x gradlew'
                    sh './gradlew assembleRelease --no-daemon'
                }
            }
        }

        stage('Archive APK') {
            steps {
                archiveArtifacts artifacts: 'android/app/build/outputs/apk/release/*.apk', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Android APK 빌드 성공!'
        }
        failure {
            echo 'Android APK 빌드 실패!'
        }
    }
}
