import { AuthError } from "./AuthError";
import { IdToken } from "../account/IdToken";
import { ScopeSet } from "../request/ScopeSet";
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
export declare const ClientAuthErrorMessage: {
    clientInfoDecodingError: {
        code: string;
        desc: string;
    };
    clientInfoEmptyError: {
        code: string;
        desc: string;
    };
    idTokenParsingError: {
        code: string;
        desc: string;
    };
    nullOrEmptyIdToken: {
        code: string;
        desc: string;
    };
    endpointResolutionError: {
        code: string;
        desc: string;
    };
    invalidAuthorityType: {
        code: string;
        desc: string;
    };
    hashNotDeserialized: {
        code: string;
        desc: string;
    };
    blankGuidGenerated: {
        code: string;
        desc: string;
    };
    invalidStateError: {
        code: string;
        desc: string;
    };
    stateMismatchError: {
        code: string;
        desc: string;
    };
    nonceMismatchError: {
        code: string;
        desc: string;
    };
    accountMismatchError: {
        code: string;
        desc: string;
    };
    invalidIdToken: {
        code: string;
        desc: string;
    };
    noTokensFoundError: {
        code: string;
        desc: string;
    };
    cacheParseError: {
        code: string;
        desc: string;
    };
    userLoginRequiredError: {
        code: string;
        desc: string;
    };
    multipleMatchingTokens: {
        code: string;
        desc: string;
    };
    multipleMatchingAccounts: {
        code: string;
        desc: string;
    };
    tokenRequestCannotBeMade: {
        code: string;
        desc: string;
    };
    appendEmptyScopeError: {
        code: string;
        desc: string;
    };
    removeEmptyScopeError: {
        code: string;
        desc: string;
    };
    appendScopeSetError: {
        code: string;
        desc: string;
    };
    emptyInputScopeSetError: {
        code: string;
        desc: string;
    };
    DeviceCodePollingCancelled: {
        code: string;
        desc: string;
    };
    DeviceCodeExpired: {
        code: string;
        desc: string;
    };
    NoAccountInSilentRequest: {
        code: string;
        desc: string;
    };
    invalidCacheRecord: {
        code: string;
        desc: string;
    };
    invalidCacheEnvironment: {
        code: string;
        desc: string;
    };
    noAccountFound: {
        code: string;
        desc: string;
    };
    CachePluginError: {
        code: string;
        desc: string;
    };
    noCryptoObj: {
        code: string;
        desc: string;
    };
    invalidCacheType: {
        code: string;
        desc: string;
    };
    unexpectedAccountType: {
        code: string;
        desc: string;
    };
    unexpectedCredentialType: {
        code: string;
        desc: string;
    };
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
export declare class ClientAuthError extends AuthError {
    constructor(errorCode: string, errorMessage?: string);
    /**
     * Creates an error thrown when client info object doesn't decode correctly.
     * @param caughtError
     */
    static createClientInfoDecodingError(caughtError: string): ClientAuthError;
    /**
     * Creates an error thrown if the client info is empty.
     * @param rawClientInfo
     */
    static createClientInfoEmptyError(rawClientInfo: string): ClientAuthError;
    /**
     * Creates an error thrown when the id token extraction errors out.
     * @param err
     */
    static createIdTokenParsingError(caughtExtractionError: string): ClientAuthError;
    /**
     * Creates an error thrown when the id token string is null or empty.
     * @param invalidRawTokenString
     */
    static createIdTokenNullOrEmptyError(invalidRawTokenString: string): ClientAuthError;
    /**
     * Creates an error thrown when the endpoint discovery doesn't complete correctly.
     */
    static createEndpointDiscoveryIncompleteError(errDetail: string): ClientAuthError;
    /**
     * Creates an error thrown if authority type is not valid.
     * @param invalidAuthorityError
     */
    static createInvalidAuthorityTypeError(givenUrl: string): ClientAuthError;
    /**
     * Creates an error thrown when the hash cannot be deserialized.
     * @param invalidAuthorityError
     */
    static createHashNotDeserializedError(hashParamObj: string): ClientAuthError;
    /**
     * Creates an error thrown when the state cannot be parsed.
     * @param invalidState
     */
    static createInvalidStateError(invalidState: string, errorString?: string): ClientAuthError;
    /**
     * Creates an error thrown when two states do not match.
     */
    static createStateMismatchError(): ClientAuthError;
    /**
     * Creates an error thrown when the nonce does not match.
     */
    static createNonceMismatchError(): ClientAuthError;
    /**
     * Creates an error thrown when the cached account and response account do not match.
     */
    static createAccountMismatchError(): ClientAuthError;
    /**
     * Throws error if idToken is not correctly formed
     * @param idToken
     */
    static createInvalidIdTokenError(idToken: IdToken): ClientAuthError;
    /**
     * Creates an error thrown when the authorization code required for a token request is null or empty.
     */
    static createNoTokensFoundError(): ClientAuthError;
    /**
     * Creates an error in cache parsing.
     */
    static createCacheParseError(cacheKey: string): ClientAuthError;
    /**
     * Throws error when renewing token without login.
     */
    static createUserLoginRequiredError(): ClientAuthError;
    /**
     * Throws error when multiple tokens are in cache for the given scope.
     * @param scope
     */
    static createMultipleMatchingTokensInCacheError(scope: string): ClientAuthError;
    /**
     * Throws error when multiple tokens are in cache for the given scope.
     * @param scope
     */
    static createMultipleMatchingAccountsInCacheError(): ClientAuthError;
    /**
     * Throws error when no auth code or refresh token is given to ServerTokenRequestParameters.
     */
    static createTokenRequestCannotBeMadeError(): ClientAuthError;
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createAppendEmptyScopeToSetError(givenScope: string): ClientAuthError;
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createRemoveEmptyScopeFromSetError(givenScope: string): ClientAuthError;
    /**
     * Throws error when attempting to append null or empty ScopeSet.
     * @param appendError
     */
    static createAppendScopeSetError(appendError: string): ClientAuthError;
    /**
     * Throws error if ScopeSet is null or undefined.
     * @param givenScopeSet
     */
    static createEmptyInputScopeSetError(givenScopeSet: ScopeSet): ClientAuthError;
    /**
     * Throws error if user sets CancellationToken.cancel = true during polling of token endpoint during device code flow
     */
    static createDeviceCodeCancelledError(): ClientAuthError;
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeExpiredError(): ClientAuthError;
    /**
     * Throws error when silent requests are made without an account object
     */
    static createNoAccountInSilentRequestError(): ClientAuthError;
    /**
     * Throws error when cache record is null or undefined.
     */
    static createNullOrUndefinedCacheRecord(): ClientAuthError;
    /**
     * Throws error when provided environment is not part of the CloudDiscoveryMetadata object
     */
    static createInvalidCacheEnvironmentError(): ClientAuthError;
    /**
     * Throws error when account is not found in cache.
     */
    static createNoAccountFoundError(): ClientAuthError;
    /**
     * Throws error if ICachePlugin not set on CacheManager.
     */
    static createCachePluginError(): ClientAuthError;
    /**
     * Throws error if crypto object not found.
     * @param operationName
     */
    static createNoCryptoObjectError(operationName: string): ClientAuthError;
    /**
    * Throws error if cache type is invalid.
    */
    static createInvalidCacheTypeError(): ClientAuthError;
    /**
    * Throws error if unexpected account type.
    */
    static createUnexpectedAccountTypeError(): ClientAuthError;
    /**
    * Throws error if unexpected credential type.
    */
    static createUnexpectedCredentialTypeError(): ClientAuthError;
}
