resource "aws_iam_user" "deployer" {
  name = "qualificamais-deployer"

  lifecycle {
    ignore_changes = [tags]
  }
}

data "aws_iam_policy_document" "deployer_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:ListBucket",
      "s3:PutObject",
      "s3:Get*"
    ]
    resources = [
      "arn:aws:s3:::azure-infrastructure-terraform-remote-state",
      "arn:aws:s3:::azure-infrastructure-terraform-remote-state/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "ec2:Describe*",
      "ec2:List*"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_policy" "deployer_policy" {
  name   = "Deployer"
  policy = data.aws_iam_policy_document.deployer_policy.json
}

resource "aws_iam_user_policy_attachment" "dns_checker_attachment" {
  user       = aws_iam_user.deployer.name
  policy_arn = aws_iam_policy.deployer_policy.arn
}

resource "aws_iam_access_key" "deployer_access_key" {
  user = aws_iam_user.deployer.name
}

output "deployer_access_key" {
  value = aws_iam_access_key.deployer_access_key.id
}

output "deploy_secret_key" {
  value     = aws_iam_access_key.deployer_access_key.secret
  sensitive = true
}
