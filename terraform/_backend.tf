terraform {
  backend "s3" {
    encrypt = true
    bucket  = "azure-infrastructure-terraform-remote-state"
    key     = "qualificamais.tfstate"
    region  = "us-east-1"
  }
}
