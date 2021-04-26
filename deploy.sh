#!/bin/bash

# Set secrets via environment variables
export TF_VAR_accesskey=$AWS_ACCESS_KEY
export TF_VAR_secretkey=$AWS_SECRET_KEY

set -o errexit -o nounset

cd terraform

terraform init -backend-config="access_key=$AWS_ACCESS_KEY" -backend-config="secret_key=$AWS_SECRET_KEY"

terraform plan

terraform apply -auto-approve