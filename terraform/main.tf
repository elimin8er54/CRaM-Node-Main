variable "accesskey" {
  description = "The access for the AWS Admin user"
  type        = string
  sensitive   = true
}
variable "secretkey" {
  description = "The secret for the AWS Admin user"
  type        = string
  sensitive   = true
}

provider "aws" {
  region     = "us-east-2"
  access_key = var.accesskey
  secret_key = var.secretkey
}

terraform {
  backend "s3" {
    bucket = "crm-node-state"
    key    = "terraform.tfstat"
    region = "us-east-2"
  }
}

resource "aws_ecr_repository" "docker" {
  name                 = "docker_ecr"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
