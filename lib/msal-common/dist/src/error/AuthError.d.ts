/**
 * AuthErrorMessage class containing string constants used by error codes and messages.
 */
export declare const AuthErrorMessage: {
    unexpectedError: {
        code: string;
        desc: string;
    };
};
/**
 * General error class thrown by the MSAL.js library.
 */
export declare class AuthError extends Error {
    errorCode: string;
    errorMessage: string;
    constructor(errorCode: string, errorMessage?: string);
    /**
     * Creates an error that is thrown when something unexpected happens in the library.
     * @param errDesc
     */
    static createUnexpectedError(errDesc: string): AuthError;
}
