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
                    sh 'yarn format'
                }
            }
        }
        stage('SAST') {
            steps {
                nodejs ('Nodejs_18.12.0'){
                    sh 'yarn install'
                    sh 'yarn lint'
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
