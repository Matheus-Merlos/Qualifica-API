output "server_private_key" {
  value     = tls_private_key.deployer_key.private_key_pem
  sensitive = true
}

output "server_public_ip_address" {
  value     = aws_instance.qualificamais_server.public_ip
  sensitive = true
}
