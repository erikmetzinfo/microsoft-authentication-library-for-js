import { IdTokenClaims } from "./IdTokenClaims";
import { ICrypto } from "../crypto/ICrypto";
/**
 * Id Token representation class. Parses id token string and generates claims object.
 */
export declare class IdToken {
    rawIdToken: string;
    claims: IdTokenClaims;
    constructor(rawIdToken: string, crypto: ICrypto);
    /**
     * Extract IdToken by decoding the RAWIdToken
     *
     * @param encodedIdToken
     */
    static extractIdToken(encodedIdToken: string, crypto: ICrypto): IdTokenClaims;
}
