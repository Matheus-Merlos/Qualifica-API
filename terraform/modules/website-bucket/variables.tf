variable "website_url" {
  type        = string
  description = "A URL do Website que o Bucket e a distribuição Cloudfront terão"
}

variable "certificate_arn" {
  type        = string
  description = "ARN do certificado ACM"
}
