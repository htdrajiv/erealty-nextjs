import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';

AWS.config.update({
    region: process.env.S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})


const AWS_S3_BUCKET = process.env.AWS_BUCKET;
const AWS_IMAGES_FOLDER = process.env.AWS_IMAGES_FOLDER;

export const config = {
    api: {
        bodyParser: false,
    },
}

async function emptyS3Directory(prefix) {
    const listParams = {
        Bucket: AWS_S3_BUCKET,
        Prefix: AWS_IMAGES_FOLDER + "/" + prefix, // ex. path/to/folder
    };
    console.log(listParams.prefix)
    var s3 = new AWS.S3(listParams);
    const listedObjects = await s3.listObjects(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: AWS_S3_BUCKET,
        Delete: { Objects: [] },
    };

    listedObjects.Contents.forEach((content) => {
        deleteParams.Delete.Objects.push({ Key: content.Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(prefix);
}

async function uploadImage(req, form) {
    var returnData = [];
    form.parse(req, (err, fields, files) => {
        var images = files.images;
        for (const file of images) {
            console.log(file)
            let fileParts = file.name.split('.');
            let fileName = AWS_IMAGES_FOLDER + "/" + fields.propertyId + "/" + fileParts[0];
            let fileType = fileParts[1];
            const params = {
                Bucket: AWS_S3_BUCKET,
                Key: fileName,
                Expires: 500,
                Body: fs.readFileSync(file.path),
                ACL: "public-read"
            };
            var upload = new AWS.S3.ManagedUpload({ params });
            var promise = upload.promise();
            promise.then(
                function (data) {
                    returnData.push(fileName)
                },
                function (err) {
                    console.log("There was an error uploading your photo: ", err.message);
                }
            );
        }
    })
    return returnData;
}

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            break;
        case "POST":
            const form = new formidable({ multiples: true });
            form.keepExtensions = true;
            let returnData = await uploadImage(req, form);
            res.status(200).json(returnData)
            res.end()
            break;
        case "DELETE":
            await emptyS3Directory(req.query.propertyId);
            res.status(200).json({})
            res.end()
            break;
    }

}