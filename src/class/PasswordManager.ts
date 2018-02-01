import axios from 'axios'
import randomString = require('random-string')
import { AES } from 'crypto-js'

import config from '../config'
import StateManager from './StateManager'

export default class PasswordManager {

    /**
     * Create new password to user
     * @param masterpass Unique password asked to the user 
     * @param serviceName Associated service name (Facebook, Twitter...)
     */
    async createPassword(masterpass: string, serviceName: string) {
        // Generate random string
        let pass = randomString({
            length: 16,
            special: true
        })
        // Encrypt it
        let encryptedPass = AES.encrypt(pass, masterpass)
        // Send to the server
        try {
            let result = await axios.post(config.apiurl + 'password', {
                "serviceName": serviceName,
                "password": encryptedPass.toString()
            }, {
                headers: {
                    "Authorization": StateManager.getInstance().get("userToken")
                }
            })
            return result.data
        } catch(err) {
            throw err
        }
            
    }
}