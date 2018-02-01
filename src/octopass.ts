import Authenticator from './class/Authenticator'
import PasswordManager from './class/PasswordManager'
import StateManager from './class/StateManager'

export default class Octopass {    
    private authenticator: Authenticator
    private passwordManager: PasswordManager

    /**
     * @param clientToken Access token given by Octopass
     */
    constructor(clientToken: string) {
        if (clientToken == null) {
            throw new Error('accessToken is required')
        }
        // set state
        StateManager.getInstance().updateState("clientToken", clientToken)
        this.authenticator = new Authenticator()
        this.passwordManager = new PasswordManager()
    }
    
    /**
     * Log user to the application
     * @param username final client username
     * @param password final client password
     */
    async login(username: string, password: string) {
        try {
            let response = await this.getAuthenticator().login(username, password)
            StateManager.getInstance().updateState("userToken", response.token)
        } catch(err) {
            throw err
        }
    }

    getAuthenticator() {
        return this.authenticator
    }

    getPasswordManager() {
        return this.passwordManager
    }


}