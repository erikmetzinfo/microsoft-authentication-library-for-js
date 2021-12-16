import formMiddleWare from "../../src/middlewares/formdata";

import nextConnect from "next-connect";
import uploadCadBlobMiddleWare from "../../src/middlewares/blob";

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

apiRoute.use(formMiddleWare);
apiRoute.use(uploadCadBlobMiddleWare);

apiRoute.post((req, res) => {
    res.status(200).json({ data: "success", requestIds: req.requestIds });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
