// export default async (req, res) => {
//     const client = await clientPromise;
//     const { blob } = req.query;

//     const database = client.db(process.env.NEXT_PUBLIC_MONGODB_NAME_META);
//     const customerGroup = req.query.customerGroup;

//     // console.log(customerGroup);
//     let query = { customerGroup: customerGroup };
//     if (customerGroup === process.env.NEXT_PUBLIC_AZURE_AD_ADMIN_GROUP) {
//         query = {};
//     }

//     const userdb = await database
//         .collection(process.env.NEXT_PUBLIC_MONGODB_COL_ROB)
//         .find(query)
//         .toArray();
//     // console.log("userdb", userdb);
//     res.json(userdb);
// };

import nextConnect from "next-connect";

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

const uploadFilesToBlob = (req, res, next) => {
    console.log("req", req);
    console.log("#######################################################");
    console.log("req.method", req.method);
    console.log("req.body", req.body);
    console.log("req.data", req.data);
    console.log("req.file", req.file);
    console.log("req.files", req.files);
    console.log("req.firstFilename", req.firstFilename);
    console.log("req.foo", req.foo);

    next();
};

apiRoute.use(uploadFilesToBlob);
// apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
    res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
