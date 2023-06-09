pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    environment {
        PATH = "/usr/local/bin:${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Formatting') {
            steps {
                nodejs ('Nodejs_18.12.0'){
                    sh 'yarn install'
                    sh 'yarn format'
                }
            }
        }

        stage('SAST') {
            steps {
                nodejs ('Nodejs_18.12.0'){
                    sh 'yarn lint'
                }
            }
        }
        stage('Code Quality Check via SonarQube') {
            steps {
                script {
                    def scannerHome = tool 'sonarqubeccanner';
                    withSonarQubeEnv("sonarqube") {
                        sh "${tool("sonarqubeccanner")}/bin/sonar-scanner \
                        -Dsonar.projectKey=sonarqube-react-project \
                        -Dsonar.sources=. \
                        -Dsonar.css.node=. \
                        -Dsonar.host.url=http://192.168.31.189:9000 \
                        -Dsonar.token=sqp_08d68b6cad3e519a53a834267a80325bcdfd08af \
                        -Dsonar.exclusions=Dockerfile"
                    }
                 }
            }
        }

        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }

        stage('Build') {
            when {
                expression {
                    GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    return env.GIT_BRANCH == 'origin/master'
                }
            }
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy') {
            when {
                expression {
                    GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    return env.GIT_BRANCH == 'origin/master'
                }
            }
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        always {
            dir("${env.WORKSPACE}@tmp") {
                deleteDir()
            }
        }
    }
}
