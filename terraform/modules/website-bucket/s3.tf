resource "aws_s3_bucket" "this" {
  bucket = var.website_url

  tags = {
    Name = var.website_url
  }
}

resource "aws_s3_bucket_ownership_controls" "name" {
  bucket = aws_s3_bucket.this.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_access" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "website_configuration" {
  bucket = aws_s3_bucket.this.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_cors_configuration" "cors_configuration" {
  bucket = aws_s3_bucket.this.id

  cors_rule {
    allowed_headers = [ "*" ]
    allowed_methods = [ "GET", "POST", "PUT", "DELETE", "HEAD" ]
    allowed_origins = [ "*" ]
    expose_headers  = [  ]
    max_age_seconds = 3000
  }
}

data "aws_iam_policy_document" "bucket_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject"
    ]
    principals {
      type = "AWS"
      identifiers = [ "*" ]
    }
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.this.id}/*"
    ]
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.this.id

  policy = data.aws_iam_policy_document.bucket_policy.json

  depends_on = [ aws_s3_bucket_public_access_block.bucket_access ]
}
