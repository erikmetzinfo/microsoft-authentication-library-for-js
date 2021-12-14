// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        // clientId: process.env.AZURE_AD_CLIENT_ID,
        // authority: "https://login.windows-ppe.net/common",
        // redirectUri: "/",

        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
        redirectUri: "/",

        postLogoutRedirectUri: "/",
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};
