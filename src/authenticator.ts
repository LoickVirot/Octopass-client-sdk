import axios from 'axios'
import config from './config'

export default class Authenticator {

    private accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    /**
     * Try to authenticate user
     * @param username 
     * @param password 
     */
    async login(username: string, password: string, apiurl: string) {
        if (username === undefined || password === undefined) {
            throw new Error('You need to specify username and password')
        }
        try {
            let result = await axios.post(config.apiurl + 'auth', {
                username: username,
                password: password
            })
            return result.data
        } catch (err) {
            if (err.response.status == 401) {
                let error: any = new Error(err.response.data)
                error.code = 401
                throw error;
            }
            throw err
        }
    }
}