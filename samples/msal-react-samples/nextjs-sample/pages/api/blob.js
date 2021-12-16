import formidable from "formidable";
import { uploadToCadBlob } from "../../src/blob";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
    // console.log("blob api triggered");

    try {
        var form = new formidable.IncomingForm();
        // form.on("file", function (name, file) {
        //     console.log(name, file);
        // });
        form.on("error", function (err) {
            console.log(err);
        });
        form.on("aborted", function () {
            console.log("Aborted");
        });
        form.parse(req, async (err, fields, files) => {
            // console.log("fields", fields);
            // console.log("files", files);

            let requestId = 1;
            Object.keys(files).forEach(async (fileName) => {
                // var val = files[fileName];
                // console.log("fileName", fileName);
                // // console.log("file", files[fileName]);
                // console.log("filepath", files[fileName].filepath);
                // console.log("mimetype", files[fileName].mimetype);
                // console.log("newFilename", files[fileName].newFilename);
                // console.log("size", files[fileName].size);
                const blobName = uuidv4() + fileName;

                const requestId = await uploadToCadBlob(
                    files[fileName],
                    blobName
                );
                // console.log("requestId in", requestId);
                // TODO: return requestId
            });

            // console.log("requestId", requestId);
            if (requestId) {
                // console.log("requestId found", requestId);
                return res.json({ requestId: requestId });
            }

            if (err) {
                console.log("Error parsing the files");
                return res.status(400).json({
                    status: "Fail",
                    message: "There was an error parsing the files",
                    error: err,
                });
            }
        });
        console.log("no error");
    } catch (error) {
        console.log("error", error);
    }
    console.log("req.query.robotSystem", req.query.robotSystem);
    // TODO: create db entry

    // res.status(500).json({ msg: "failure" });

    // const form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //     if (err) {
    //         return res.status(400).json({ error: err.message });
    //     }
    //     const [firstFileName] = Object.keys(files);
    //     console.log("firstFileName", firstFileName);

    //     res.json({ filename: firstFileName });
    // });

    // console.log("req.body", req.body);
    // console.log("req.method", req.method);
    // console.log("req.body.files", req.body.files);
    // console.log("req.body.file", req.body.file);
    // console.log("req.body.cube", req.body.cube);
    // console.log("req.body.foo", req.body.foo);
    // console.log("req.body.firstFilename", req.body.firstFilename);

    // res.json({ msg: "good" });
};

// VV important VV
export const config = {
    api: {
        bodyParser: false,
    },
};
