resource "cloudflare_dns_record" "api_dns_record" {
  zone_id = var.zone_id
  name    = "api.test"
  content = module.qualificamais-cloudfront.cloudfront_endpoint
  type    = "CNAME"
  proxied = false
  ttl     = 300

  lifecycle {
    ignore_changes = [ name ]
  }
}
