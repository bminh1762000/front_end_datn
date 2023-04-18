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
                sh 'npm install'
                sh 'npm run lint'
            }
        }
        stage('Formatting') {
            steps {
                sh 'npm run format'
            }
        }
        stage('Build-Prod') {
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
        stage('Delivery for Prod') {
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

        stage('Build-Dev') {

			when {
                expression {
                    GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    return env.GIT_BRANCH == 'origin/develop'
                }
            }
            steps {
                sh 'docker-compose build'
            }
        }

		stage('Delivery for Dev') {
            when {
                expression {
                    GIT_BRANCH = 'origin/' + sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
                    return env.GIT_BRANCH == 'origin/develop'
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
