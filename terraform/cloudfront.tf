module "qualificamais-cloudfront" {
  source = "./modules/cloudfront-distribution"

  domain          = "api.test.qualificamais.app.br"
  public_dns      = aws_instance.qualificamais_server.public_dns
  certificate_arn = aws_acm_certificate.wildcard_test_certificate.arn
}
