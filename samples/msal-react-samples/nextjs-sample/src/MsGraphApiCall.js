import { loginRequest, graphConfig } from "./authConfig";
import { msalInstance } from "../pages/_app";

import { Client } from "@microsoft/microsoft-graph-client";

function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken);
        },
    });

    return client;
}

export async function getAccount() {
    const account = msalInstance.getActiveAccount();
    // console.log("account", account);
    if (!account) {
        throw Error(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
        );
    }
    return account;
}

export async function getScopes() {
    const account = getAccount();
    if (!account) {
        return [];
    }
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    });
    if (!response.scopes) {
        throw Error("No scopes defined in account object!");
    }
    // console.log("response", response);
    return response.scopes;
}

export async function getMyGroups() {
    const account = getAccount();
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    });

    // console.log("response", response);
    const client = getAuthenticatedClient(response.accessToken);

    const groups = await client
        .api("/me/transitiveMemberOf/microsoft.graph.group?$count=true")
        .get();
    // console.log("groups", groups.value);

    let groupIds = [];
    groups.value.forEach((group) => {
        // console.log("group", group);
        groupIds.push(group.id);
    });
    return groupIds;
}

// this method will return the user details of provided userId in the attribute

export async function getUserDetails() {
    const account = getAccount();
    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    });

    // console.log("response", response);
    const client = getAuthenticatedClient(response.accessToken);

    const user = await client.api("/me").get();

    return user;
}

export async function callMsGraph() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
        );
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}
