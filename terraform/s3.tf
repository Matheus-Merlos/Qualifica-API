resource "aws_s3_bucket" "lesson_bucket" {
  bucket = "qualifica-mais-lesson-bucket"

  tags = {
    Name = "qualifica-mais-lesson-bucket"
  }
}
