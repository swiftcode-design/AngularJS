const AWS = require('aws-sdk')
  , config = require('./../config')
  , AWS_CONFIG = config.AWS_CONFIG;

AWS.config.update({
  accessKeyId: AWS_CONFIG.accessKey,
  secretAccessKey: AWS_CONFIG.secretKey,
  region: AWS_CONFIG.region
});

// REDUNDANT?
// const s3 = new AWS.S3();
// s3.createBucket({ Bucket: AWS_CONFIG.bucket });

const s3Bucket = new AWS.S3({
  params: {
    Bucket: AWS_CONFIG.bucket
  }
});

module.exports = {

  sendImageData: (req, res, next) => {

    if (!req.body.imageBody) {
      return res.status(400).send("file not present");
    };

    let imageBody = req.body.imageBody
      , imageExtension = req.body.imageExtension
      , imageName = `${makeUniqueKey(8)}.${imageExtension}`
      , s3link = `https://s3-us-west-1.amazonaws.com/${AWS_CONFIG.bucket}/${imageName}`;

    let buffer = new Buffer(imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    let params = {
      Key: imageName,
      Body: buffer,
      ContentType: 'image/' + imageExtension,
      ACL: 'public-read'
    };

    s3Bucket.putObject(params, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).send(err);
      } else {
        res.status(200).send(s3link)
      }
    });
  }
};

function makeUniqueKey(digits) {
  let key = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < digits; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return key;
};
