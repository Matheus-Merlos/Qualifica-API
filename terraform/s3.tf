resource "aws_s3_bucket" "lesson_bucket" {
  bucket = "qualifica-mais-lesson-bucket"

  tags = {
    Name = "qualifica-mais-lesson-bucket"
  }
}

resource "aws_s3_bucket_ownership_controls" "lesson_bucket_ownership_controls" {
  bucket = aws_s3_bucket.lesson_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "lesson_bucket_access_block" {
  bucket = aws_s3_bucket.lesson_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "lesson_bucket_acl" {
  depends_on = [
    aws_s3_bucket_public_access_block.lesson_bucket_access_block,
    aws_s3_bucket_ownership_controls.lesson_bucket_ownership_controls
  ]

  bucket = aws_s3_bucket.lesson_bucket.id
  acl = "public-read"
}

resource "aws_s3_bucket_policy" "lesson_bucket_policy" {
  bucket = aws_s3_bucket.lesson_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.lesson_bucket.arn}/*"
      }
    ]
  })
}









resource "aws_s3_bucket" "thumbnail_bucket" {
  bucket = "qualifica-mais-thumbnail-bucket"

  tags = {
    Name = "qualifica-mais-thumbnail-bucket"
  }
}

resource "aws_s3_bucket_ownership_controls" "thumbnail_bucket_ownership_controls" {
  bucket = aws_s3_bucket.thumbnail_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "thumbnail_bucket_access_block" {
  bucket = aws_s3_bucket.thumbnail_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "thumbnail_bucket_acl" {
  depends_on = [
    aws_s3_bucket_public_access_block.thumbnail_bucket_access_block,
    aws_s3_bucket_ownership_controls.thumbnail_bucket_ownership_controls
  ]

  bucket = aws_s3_bucket.thumbnail_bucket.id
  acl = "public-read"
}

resource "aws_s3_bucket_policy" "thumbnail_bucket_policy" {
  bucket = aws_s3_bucket.thumbnail_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.thumbnail_bucket.arn}/*"
      }
    ]
  })
}

