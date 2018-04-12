import axios from 'axios'
import randomString = require('random-string')
import * as CryptoJS from 'crypto-js'

import config from '../config'
import StateManager from './StateManager'
import Password from '../interface/Password'

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
        let encryptedPass = CryptoJS.AES.encrypt(pass, masterpass)
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

    /**
     * Return an array of all user's passwords
     */
    async listUserPasswords() {
        try {
            let result = await axios.get(config.apiurl + 'user/passwords', {
                headers: {
                    "Authorization": StateManager.getInstance().get("userToken")
                }
            })
            return await result.data.map((passwordDbElem: any) => {
                let passwordObj: Password = {
                    id: passwordDbElem._id,
                    serviceName: passwordDbElem.serviceName
                }
                return passwordObj;
            })
        } catch (err) {
            throw err;
        } 
    }

    /**
     * Get one password from ID
     * @param id Password ID
     */
    async getPassword(id: string) {
        try {
            let password = await axios.get(config.apiurl + id + '/password', {
                headers: {
                    "Authorization": StateManager.getInstance().get("userToken")
                }
            })
            let passwordObj: Password = {
                id: password.data._id,
                serviceName: password.data.serviceName,
                password: password.data.password
            }
            return passwordObj;
        } catch (err) {
            throw err;
        }
    }

    async decodePassword(masterPass: string, password: Password) {
        if (password.password === undefined) {
            throw new Error("Password in password object is empty")
        }
        // Encrypt it
        let decodedPassBytes = CryptoJS.AES.decrypt(password.password.toString(), masterPass)
        return decodedPassBytes.toString(CryptoJS.enc.Utf8);
    }

    async updatePassword(password: Password) {
        try {
            let res = await axios.put(config.apiurl + password.id + '/password', {
                serviceName: password.serviceName
            })
            return res;
        } catch (err) {
            if (err.status == 401) {
                let error: any = new Error(err.response.data)
                error.code = 401
                return error
            }
            throw err
        }
    }

    async deletePassword(id: String) {
        try {
            let res = await axios.delete(config.apiurl + id + '/password')
            return res;
        } catch (err) {
            if (err.status == 401) {
                let error: any = new Error(err.response.data)
                error.code = 401
                return error
            }
            throw err
        }
    }
}