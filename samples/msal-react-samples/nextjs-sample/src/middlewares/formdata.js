import formidable from "formidable";

const formMiddleWare = (req, res, next) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        req.fields = fields;
        req.files = files;
        next();
    });
};

export default formMiddleWare;

export const config = {
    api: {
        bodyParser: false,
    },
};
