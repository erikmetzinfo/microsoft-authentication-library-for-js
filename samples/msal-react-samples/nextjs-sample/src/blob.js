import { BlobServiceClient } from "@azure/storage-blob";

const sasToken = process.env.NEXT_PUBLIC_AZURE_BLOB_KEY;
const storageAccountName = process.env.NEXT_PUBLIC_AZURE_BLOB_ACC;

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
    return !(!storageAccountName || !sasToken);
};

const createBlobInContainer = async (containerClient, file, blobName) => {
    // create blobClient for container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // set mimetype as determined from browser with file upload control
    // const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
    // console.log("options", options);

    // upload file
    try {
        const uploadBlobResponse = await blockBlobClient.upload(
            JSON.stringify(file),
            file.size
        );
        console.log(
            "Blob was uploaded successfully. requestId: ",
            uploadBlobResponse.requestId
        );
        return uploadBlobResponse.requestId;
    } catch (error) {
        console.log("error", error);
    }
    return null;
    // await blobClient.uploadBrowserData(file, options);
    // await blobClient.setMetadata({ UserName: "website" });
};

// const blockBlobClient = containerClient.getBlockBlobClient(blobName);
// const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);

const uploadFileToBlob = async (file, blobName, blobContainerName) => {
    // console.log("blobContainerName", blobContainerName);
    const blobServiceClient = await BlobServiceClient.fromConnectionString(
        process.env.NEXT_PUBLIC_AZURE_BLOB_CONNECTION_STRING
    );

    // get Container - full public read access
    const containerName =
        blobServiceClient.getContainerClient(blobContainerName);
    // console.log("containerName", containerName);
    const containerClient = await blobServiceClient.getContainerClient(
        containerName.containerName
    );
    // console.log("containerClient", containerClient);

    return await createBlobInContainer(containerClient, file, blobName);
    // files.forEach(async (file) => {
    //     // upload file
    //     await createBlobInContainer(containerClient, file);
    // });
};

export const uploadToCadBlob = (file, blobName) => {
    // console.log("in blob file", file);
    // console.log("in blob file", typeof JSON.stringify(file));
    // console.log("in blob blobName", blobName);
    return uploadFileToBlob(
        file,
        blobName,
        process.env.NEXT_PUBLIC_AZURE_BLOB_CAD
    );
};
