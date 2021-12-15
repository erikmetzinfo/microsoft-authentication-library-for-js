import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
    InteractionStatus,
    InteractionType,
    InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { loginRequest } from "../src/authConfig";
import React, { useEffect, useState } from "react";
import { getMyGroups } from "../src/MsGraphApiCall";
import { Button, Typography } from "@material-ui/core";
import cookieCutter from "cookie-cutter";

import { DropzoneArea } from "material-ui-dropzone";
import { RobotSystemSelector } from "../components/robotSystemSelector";
import { cookieLastRobotSystem } from "./_app";

const FileSubmit = (robotSystem) => {
    const [files, setFiles] = useState([]);

    function handleSelectedFiles(filesSelected) {
        // console.log("files", filesSelected);
        if (filesSelected.length > 0) setFiles(filesSelected);
    }

    function handleSubmitFiles() {
        console.log("upload files", files);
    }

    console.log("robotFiles", files);
    if (!robotSystem) return null;

    return (
        <>
            <DropzoneArea
                onChange={handleSelectedFiles}
                // open={this.state.open}
                // onSave={handleSelectedFiles}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                showPreviews={false}
                // maxFileSize={5000000}
                // onClose={this.handleClose.bind(this)}
            />
            <Button variant="contained" onClick={handleSubmitFiles}>
                Upload
            </Button>
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
