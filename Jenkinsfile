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
                git branch: 'main',
                    url: 'https://github.com/your-org/your-frontend-repo.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'frontend-ssh',
                    keyFileVariable: 'SSH_KEY'
                )]) {
                    sh '''
                    # 필요시 배포 경로 생성
                    ssh -p $REMOTE_PORT -i $SSH_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST "mkdir -p $DEPLOY_PATH"
                    # 빌드 산출물 복사
                    scp -P $REMOTE_PORT -i $SSH_KEY -o StrictHostKeyChecking=no -r dist/* $REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH/
                    # Nginx 재시작
                    ssh -p $REMOTE_PORT -i $SSH_KEY -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST "sudo systemctl restart nginx"
                    '''
                }
            }
        }
    }
}