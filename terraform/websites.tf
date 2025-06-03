module "qualificamais_test_website" {
  source = "./modules/website-bucket"

  website_url     = "www.test.qualificamais.app.br"
  certificate_arn = aws_acm_certificate.wildcard_test_certificate.arn
}
