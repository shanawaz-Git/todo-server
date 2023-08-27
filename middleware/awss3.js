require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const S3 = require("aws-sdk");

S3.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_2,
  secretAccessKey: process.env.AWS_SECRET_KEY_2,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new S3.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, "response - " + Date.now());
    },
  }),
});

module.exports = upload;
