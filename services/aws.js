const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config();

const BUCKETNAME = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_REGION;
const ACCESSKEYID = process.env.AWS_ACCESS_KEY;
const SECRETACCESSKEY = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  REGION,
  ACCESSKEYID,
  SECRETACCESSKEY,
});

exports.uploadfiletoS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);

  params = {
    Bucket: BUCKETNAME,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(params).promise();
};
