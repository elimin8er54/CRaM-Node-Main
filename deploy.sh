#!/bin/bash

# Set secrets via environment variables
export TF_VAR_accesskey=$AWS_ACCESS_KEY
export TF_VAR_secretkey=$AWS_SECRET_KEY

set -o errexit -o nounset

cd terraform

terraform init -backend-config="access_key=$AWS_ACCESS_KEY" -backend-config="secret_key=$AWS_SECRET_KEY"

terraform plan

terraform apply -auto-approve

cd ..

docker --version  # document the version travis is using
pip install --user awscli # install aws cli w/o sudo
export PATH=$PATH:$HOME/.local/bin # put aws in the path
aws ecr get-login-password --region us-east-2 #needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY envvars
docker build -t docker_ecr .
docker tag docker_ecr:latest 347280423490.dkr.ecr.us-east-2.amazonaws.com/docker_ecr:latest
docker push 347280423490.dkr.ecr.us-east-2.amazonaws.com/docker_ecr:latest