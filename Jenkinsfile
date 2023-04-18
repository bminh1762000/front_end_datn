pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    tools {
        nodejs 'Nodejs_18.12.0'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
                sh 'sudo docker-compose build'
            }
        }
        stage('Linting') {
            steps {
                sh 'yarn install'
                sh 'yarn lint'
            }
        }
        stage('Formatting') {
            steps {
                sh 'yarn run format'
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
                sh 'sudo docker-compose up -d'
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
