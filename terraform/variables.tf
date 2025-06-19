variable "cloudflare_api_token" {
  type        = string
  description = "O Token da API da conta do Cloudflare"
  sensitive   = true
  default     = null
}

variable "zone_id" {
  type        = string
  description = "O ID da Zona do Cloudflare"
  sensitive   = true
  default     = null
}
