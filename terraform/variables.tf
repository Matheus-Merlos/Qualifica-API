variable "cloudflare_api_token" {
  description = "O Token da API da conta do Cloudflare"
  sensitive   = true
}

variable "zone_id" {
  description = "O ID da Zona do Cloudflare"
  sensitive   = true
}
