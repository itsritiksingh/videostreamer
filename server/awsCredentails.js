const AWS = require('aws-sdk');

// Set AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESSKEY,
  secretAccessKey: process.env.AWS_S3_SECRET,
});

// Create S3 client object
module.exports.AWS = AWS;