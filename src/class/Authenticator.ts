import axios from 'axios'
import config from '../config'
import StateManager from './StateManager'

export default class Authenticator {

    private accessToken: string
    private userToken: string

    constructor() {
        this.accessToken = StateManager.getInstance().get("clientToken");
        this.userToken = StateManager.getInstance().get("userToken");
    }

    /**
     * Try to authenticate user
     * @param username 
     * @param password 
     */
    async login(username: string, password: string) {
        if (username === undefined || password === undefined) {
            throw new Error('You need to specify username and password')
        }
        try {            
            let result = await axios.post(config.apiurl + 'auth', {
                username: username,
                password: password
            })
            StateManager.getInstance().updateState('userToken', result.data.token)
            return result.data 
        } catch (err) { 
            StateManager.getInstance().updateState('userToken', '')
            if (err.response.status == 401) {
                let error: any = new Error(err.response.data)
                error.code = 401
                throw error;
            }
            throw err
        }
    }

    isLoggedIn() {
        return StateManager.getInstance().get('userToken') !== "";
    }
}