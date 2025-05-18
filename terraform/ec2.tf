resource "aws_instance" "qualificamais_server" {
  ami           = "ami-0789039e34e739d67" //Debian
  instance_type = "t4g.nano"
  key_name      = "neon-bot-key-pair"

  vpc_security_group_ids = [aws_security_group.ec2_security_group.id]

  tags = {
    Name       = "qualificamais-server"
    Auto-Start = true
  }
}
