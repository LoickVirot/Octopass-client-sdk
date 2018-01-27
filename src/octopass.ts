import axios from 'axios'

export default class Octopass {
    apiurl: string = "http://localhost:8080/"

    accessToken: string

    /**
     * @param accessToken Access token given by Octopass
     */
    constructor(accessToken: string) {
        if (accessToken == null) {
            throw new Error('accessToken is required')
        }
        this.accessToken = accessToken
    }

    async login(username: string, password: string) {
        if (username === undefined || password === undefined) {
            throw new Error('You need to specify username and password')
        }
        try {
            let result =  await axios.post(this.apiurl + 'auth', {
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