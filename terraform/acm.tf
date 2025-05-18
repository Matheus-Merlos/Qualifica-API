resource "aws_acm_certificate" "wildcard_certificate" {
  domain_name       = "*.qualificamais.app.br"
  validation_method = "DNS"
}

resource "aws_acm_certificate" "wildcard_test_certificate" {
  domain_name       = "*.test.qualificamais.app.br"
  validation_method = "DNS"
}

resource "aws_acm_certificate" "main_certificate" {
  domain_name       = "qualificamais.app.br"
  validation_method = "DNS"
}
