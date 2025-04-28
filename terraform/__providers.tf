terraform {
  required_version = "~> 1.11.3"

  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.98.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
