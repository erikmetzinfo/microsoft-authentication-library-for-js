import { AccountCache, AccountFilter, CredentialFilter, CredentialCache } from "./utils/CacheTypes";
import { CacheRecord } from "./entities/CacheRecord";
import { CredentialEntity } from "./entities/CredentialEntity";
import { AccountEntity } from "./entities/AccountEntity";
import { ICacheManager } from "./interface/ICacheManager";
import { AccountInfo } from "../account/AccountInfo";
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 */
export declare abstract class CacheManager implements ICacheManager {
    /**
     * Function to set item in cache.
     * @param key
     * @param value
     */
    abstract setItem(key: string, value: string | object, type?: string): void;
    /**
     * Function which retrieves item from cache.
     * @param key
     */
    abstract getItem(key: string, type?: string): string | object;
    /**
     * Function to remove an item from cache given its key.
     * @param key
     */
    abstract removeItem(key: string, type?: string): boolean;
    /**
     * Function which returns boolean whether cache contains a specific key.
     * @param key
     */
    abstract containsKey(key: string, type?: string): boolean;
    /**
     * Function which retrieves all current keys from the cache.
     */
    abstract getKeys(): string[];
    /**
     * Function which clears cache.
     */
    abstract clear(): void;
    /**
     * Returns all accounts in cache
     */
    getAllAccounts(): AccountInfo[];
    /**
     * saves a cache record
     * @param cacheRecord
     */
    saveCacheRecord(cacheRecord: CacheRecord): void;
    /**
     * saves account into cache
     * @param account
     */
    private saveAccount;
    /**
     * saves credential - accessToken, idToken or refreshToken into cache
     * @param credential
     */
    private saveCredential;
    /**
     * saves access token credential
     * @param credential
     */
    private saveAccessToken;
    /**
     * Given account key retrieve an account
     * @param key
     */
    getAccount(key: string): AccountEntity;
    /**
     * retrieve a credential - accessToken, idToken or refreshToken; given the cache key
     * @param key
     */
    getCredential(key: string): CredentialEntity;
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    getAccountsFilteredBy(accountFilter?: AccountFilter): AccountCache;
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    private getAccountsFilteredByInternal;
    /**
     * retrieve credentails matching all provided filters; if no filter is set, get all credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    getCredentialsFilteredBy(filter: CredentialFilter): CredentialCache;
    /**
     * Support function to help match credentials
     * @param homeAccountId
     * @param environment
     * @param credentialType
     * @param clientId
     * @param realm
     * @param target
     */
    private getCredentialsFilteredByInternal;
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    removeAccount(accountKey: string): boolean;
    /**
     * returns a boolean if the given account is removed
     * @param account
     */
    removeAccountContext(account: AccountEntity): boolean;
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    removeCredential(credential: CredentialEntity): boolean;
    /**
     *
     * @param value
     * @param homeAccountId
     */
    private matchHomeAccountId;
    /**
     *
     * @param value
     * @param environment
     */
    private matchEnvironment;
    /**
     *
     * @param entity
     * @param credentialType
     */
    private matchCredentialType;
    /**
     *
     * @param entity
     * @param clientId
     */
    private matchClientId;
    /**
     *
     * @param entity
     * @param realm
     */
    private matchRealm;
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    private matchTarget;
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    private isAppMetadata;
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    static toObject<T>(obj: T, json: object): T;
}
export declare class DefaultStorageClass extends CacheManager {
    setItem(): void;
    getItem(): string | object;
    removeItem(): boolean;
    containsKey(): boolean;
    getKeys(): string[];
    clear(): void;
}
