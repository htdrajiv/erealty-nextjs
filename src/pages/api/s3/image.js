import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
})


const AWS_S3_BUCKET = process.env.AWS_BUCKET;
const AWS_IMAGES_FOLDER = process.env.AWS_IMAGES_FOLDER;
const AWS_S3_REGION = process.env.AWS_S3_REGION;

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            const returnData = { url: `https://s3.${AWS_S3_REGION}.amazonaws.com/${AWS_S3_BUCKET}/${AWS_IMAGES_FOLDER}` }
            res.status(200).json({ returnData });
            res.end();
            // const params = {
            //     Bucket: AWS_S3_BUCKET
            // };

            // var bucket = new AWS.S3({ params });
            // bucket.listObjects(function (err, data) {
            //     console.log(this.request.httpRequest.endpoint.href);
            //     if (err) {
            //         console.log(err);
            //         res.status(400).json({ err });
            //         res.end()
            //     } else {
            //         // console.log(data)
            //         const returnData = { url: `https://s3.us-east-2.amazonaws.com/${AWS_S3_BUCKET}/${AWS_IMAGES_FOLDER}` }
            //         returnData['data'] = data;
            //         console.log(returnData);
            //         res.status(200).json({ returnData });
            //         res.end();
            //     }
            // });
            break;
        case "POST":
            break;
        case "DELETE":

            break;

    }


}