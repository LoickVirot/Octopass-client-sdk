import Authenticator from './authenticator'

export default class Octopass {
    private accessToken: string
    
    private authenticator: Authenticator;

    /**
     * @param accessToken Access token given by Octopass
     */
    constructor(accessToken: string) {
        if (accessToken == null) {
            throw new Error('accessToken is required')
        }
        this.accessToken = accessToken
        this.authenticator = new Authenticator(accessToken)
    }
    
    getAuthenticator() {
        return this.authenticator;
    }
}