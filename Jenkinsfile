pipeline {
    agent any
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Linting') {
            steps {
                nodejs ('Nodejs_18.12.0'){
                    sh 'yarn install'
                    sh 'yarn lint'
                }
            }
        }
        stage('Formatting') {
            steps {
                nodejs ('Nodejs_18.12.0'){
                    sh 'yarn format'
                }
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
                sh 'whoami'
                sh 'pwd'
                sh 'which docker'
                sh 'docker --version'
                sh 'docker-compose --version'
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
