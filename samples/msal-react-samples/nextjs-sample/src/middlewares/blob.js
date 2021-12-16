import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

import asyncForEach from "../asyncForEach";

// TODO: https://www.npmjs.com/package/@azure/identity

const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.NEXT_PUBLIC_AZURE_BLOB_CONNECTION_STRING
);

const uploadFileToBlob = async (file, blobName, blobContainerName) => {
    // console.log("blobContainerName", blobContainerName);

    const containerName =
        blobServiceClient.getContainerClient(blobContainerName);
    const containerClient = await blobServiceClient.getContainerClient(
        containerName.containerName
    );

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadFile(file.filepath);
    return uploadBlobResponse.requestId;
};

const uploadCadBlobMiddleWare = async (req, res, next) => {
    // console.log("req.files", req.files);
    req.blobs = [];
    await asyncForEach(Object.keys(req.files), async (fileName) => {
        // var val = files[fileName];
        // console.log("file", files[fileName]);
        // console.log("filepath", files[fileName].filepath);
        // console.log("mimetype", files[fileName].mimetype);
        // console.log("newFilename", files[fileName].newFilename);
        // console.log("size", files[fileName].size);
        const blobName = uuidv4() + fileName;
        const requestId = await uploadFileToBlob(
            req.files[fileName],
            blobName,
            process.env.NEXT_PUBLIC_AZURE_BLOB_CAD
        );
        // console.log("requestId", requestId);
        req.blobs.push({
            robotSystem: req.query.robotSystem,
            blobName: blobName,
            requestId: requestId,
            status: "created",
        });
    });
    next();
};

export default uploadCadBlobMiddleWare;
