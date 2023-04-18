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
    }
    post {
        always {
            dir("${env.WORKSPACE}@tmp") {
                deleteDir()
            }
        }
    }
}
