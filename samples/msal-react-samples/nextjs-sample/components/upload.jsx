import axios from "axios";
import { useRouter } from "next/router";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
    InteractionStatus,
    InteractionType,
    InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import { getMyGroups } from "../src/MsGraphApiCall";
import { Button, IconButton, Typography, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import cookieCutter from "cookie-cutter";
import { Close as IconClose } from "@material-ui/icons";

import { DropzoneArea } from "material-ui-dropzone";
import { RobotSystemSelector } from "./robotSystemSelector";
import { cookieLastRobotSystem } from "../pages/_app";
// import Uploader from "./uploader";
// import FormData from "form-data";

const FileSubmit = (robotSystem) => {
    const [files, setFiles] = useState([]);
    // const [showUploader, setShowUploader] = useState(false);
    const [apiResponse, setApiResponse] = useState();
    const [uploadSuccess, setUploadSuccess] = useState();
    const [uploadFailure, setUploadFailure] = useState();
    const [fake, setFake] = useState();
    const [firstRun, setFirstRun] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        } else {
            if (apiResponse.status === 200) {
                setUploadSuccess(true);
                setUploadFailure(false);
                const timer = setTimeout(() => {
                    console.log("pushing", apiResponse.data.jobs[0].dbId);
                    router.push(
                        `/calculate?job=${apiResponse.data.jobs[0].dbId}`
                    );
                }, 3000);
                console.log("got response");
            } else {
                setUploadSuccess(false);
                setUploadFailure(true);
            }
        }
    }, [apiResponse]);

    function handleSelectedFiles(filesSelected) {
        if (filesSelected.length > 0) {
            console.log("filesSelected", filesSelected);
            // console.log("files", filesSelected);
            // console.log("files[0]", filesSelected[0]);
            // console.log("files[0].name", filesSelected[0].name);
            // console.log("files.target", filesSelected.target);
            setFiles(filesSelected);
        }
    }

    async function handleSubmitFiles() {
        // console.log("upload files", files);
        // setShowUploader(true);
        let form = new FormData();
        files.forEach((file) => {
            // console.log("file", file);
            // console.log("mimetype", file.type);
            // var blob = new Blob([file], { type: file.type });
            form.append(file.name, file);
        });
        // form.append("foo", firstFilename"bar");
        // form.append("", files[0].name);
        // for (var pair of form.entries()) {
        //     console.log(pair[0] + ", " + pair[1]);
        // }

        const options = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            // onUploadProgress: (progressEvent) => {
            //     const { loaded, total } = progressEvent;
            //     let percent = Math.floor((loaded * 100) / total);
            //     console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            // },
        };
        const response = await axios.post(
            `http://localhost:3000/api/blob?robotSystem=${robotSystem.props}`,
            form,
            options
            // data,
            // {
            //     headers: {
            //         accept: "application/json",
            //         "Accept-Language": "en-US,en;q=0.8",
            //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            //     },
            // }
        );
        // .then((response) => {
        //     console.log(response);
        //     if (response.status === 200) {
        //         // console.log("response", response.data.jobs);
        //         const dbID = response.data.jobs[0].dbId;
        //         console.log("dbID", dbID);
        //     }
        // });
        console.log(response);
        setApiResponse(response);
    }

    // console.log("robotFiles", files);
    if (!robotSystem) return null;

    // if (showUploader && files.length > 0) {
    //     return <Uploader files={files} />;
    // }
    return (
        <>
            <DropzoneArea
                onChange={handleSelectedFiles}
                // open={this.state.open}
                // onSave={handleSelectedFiles}
                showPreviews={false}
                showAlerts={true}
                acceptedFiles={[
                    // "image/jpeg",
                    // "image/png",
                    // "image/bmp",
                    ".ehx",
                    // ".dwg",
                    // ".dwf",
                    ".dxf",
                    // ".stl",
                    // ".iges",
                    // ".igs",
                    // ".st",
                    // ".stp",
                    // ".step",
                ]}
                showPreviews={false}
                // maxFileSize={5000000}
                // onClose={this.handleClose.bind(this)}
            />
            {files.length > 0 ? (
                <Button variant="contained" onClick={handleSubmitFiles}>
                    Upload
                </Button>
            ) : null}
            {uploadSuccess ? (
                <Snackbar
                    open={true}
                    // style={{ backgroundColor: "green" }}
                    autoHideDuration={5000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    // onClose={handleClose}
                >
                    <Alert severity="success">
                        File successfully uploaded!
                        {/* <IconButton onClick={() => closeSnackbar(snackbarKey)}>
                            <IconClose />
                        </IconButton> */}
                    </Alert>
                </Snackbar>
            ) : null}
            {uploadFailure ? (
                <Alert severity="error">
                    Error occured during file upload, please try again!
                </Alert>
            ) : null}
        </>
    );
};

const UploadContent = () => {
    const { instance, inProgress } = useMsal();
    const [groups, setGroups] = useState(null);
    const [robotSystem, setRobotSystem] = useState(null);
    const [lastRobotSystem, setLastRobotSystem] = useState();

    useEffect(() => {
        if (!groups && inProgress === InteractionStatus.None) {
            const lastVookieLastRobotSystem = cookieCutter.get(
                cookieLastRobotSystem
            );
            if (lastVookieLastRobotSystem) {
                setLastRobotSystem(lastVookieLastRobotSystem);
            } else {
                setLastRobotSystem(true);
            }
            getMyGroups()
                .then((resGroups) => {
                    // console.log("resGroups", resGroups);
                    setGroups(resGroups);
                })
                .catch((e) => {
                    if (e instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect({
                            ...loginRequest,
                            account: instance.getActiveAccount(),
                        });
                    }
                });
        }
        // console.log("groups effect", groups);
    }, [inProgress, groups, instance]);

    function handleChangeRobotSystem(event) {
        const selectedRobotSystem = event.target.value;
        // console.log("selectedRobotSystem", selectedRobotSystem);
        setRobotSystem(selectedRobotSystem);
        cookieCutter.set(cookieLastRobotSystem, selectedRobotSystem);
    }

    if (Array.isArray(groups) && lastRobotSystem) {
        // console.log("groups is Array", groups);
        // console.log("lastRobotSystem Parent", lastRobotSystem);

        return (
            <>
                <RobotSystemSelector
                    groups={groups}
                    handleChangeRobotSystem={handleChangeRobotSystem}
                    lastRobotSystem={lastRobotSystem}
                />
                {!robotSystem ? null : <FileSubmit props={robotSystem} />}
            </>
        );
    }

    return null;
};

const ErrorComponent = ({ error }) => {
    return (
        <Typography variant="h6">
            An Error Occurred: {error.errorCode}
        </Typography>
    );
};

const Loading = () => {
    return <Typography variant="h6">Authentication in progress...</Typography>;
};

export default function Upload() {
    const authRequest = {
        ...loginRequest,
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
            errorComponent={ErrorComponent}
            loadingComponent={Loading}
        >
            <UploadContent />
        </MsalAuthenticationTemplate>
    );
}
