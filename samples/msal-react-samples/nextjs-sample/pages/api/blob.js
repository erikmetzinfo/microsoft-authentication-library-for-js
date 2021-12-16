import formMiddleWare from "../../src/middlewares/formdata";

import nextConnect from "next-connect";
import uploadCadBlobMiddleWare from "../../src/middlewares/blob";
import clientPromise from "../../src/middlewares/database";
import asyncForEach from "../../src/asyncForEach";

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

const cadBlobToDb = async (req, res, next) => {
    const client = await clientPromise;
    const database = client.db(process.env.NEXT_PUBLIC_MONGODB_NAME_META);
    const robotSystem = req.query.robotSystem;

    req.userdb = [];
    let index = 0;

    await asyncForEach(req.blobs, async (blob) => {
        // console.log("cadBlobToDb robotSystem", blob.robotSystem);
        // console.log("cadBlobToDb blobName", blob.blobName);
        // console.log("cadBlobToDb requestId", blob.requestId);
        const userdb = await database
            .collection(process.env.NEXT_PUBLIC_MONGODB_COL_CAD)
            .insertOne(blob);

        const dbId = userdb.insertedId.toString();
        req.blobs[index].dbId = dbId;
        // console.log("cadBlobToDb userdb", dbId, req.blobs[index]);
        index += 1;
    });
    next();
};

apiRoute.use(formMiddleWare);
apiRoute.use(uploadCadBlobMiddleWare);
apiRoute.use(cadBlobToDb);

apiRoute.post((req, res) => {
    res.status(200).json({ data: "success", jobs: req.blobs });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
