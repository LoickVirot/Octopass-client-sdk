const assert = require('chai').assert
const Octopass = require('../dist/octopass')

let octopass = new Octopass.default("1234567")

describe('Test password manager function', () => {
    beforeEach(async () => {
        await octopass.login("Jdoe", "Test")
    })

    it('should create password', async () => {
        let ret = await octopass.getPasswordManager().createPassword("Test", "TestService")
        assert.typeOf(ret, 'string')
    })

    it('Should return all user\'s password', async () => {
        let ret = await octopass.getPasswordManager().listUserPasswords()
        assert.isTrue(ret.length > 0);
    })

    it('should return a password object with password string', async () => {
        let userPasswordList = await octopass.getPasswordManager().listUserPasswords()
        let passwordObj = await octopass.getPasswordManager().getPassword(userPasswordList[0].id)
        assert.isNotNull(passwordObj)
        assert.isNotEmpty(passwordObj.id)
        assert.isNotEmpty(passwordObj.serviceName)
        assert.isNotEmpty(passwordObj.password)
        return null;
    })

    // it ('Should return decoded password', async  () => {
    //     let password = await.getPasswordManager.decodePassword("Test", )
    // })

})

describe('Test password manager function with not access', () => {

    it('should throw an error', async () => {
        // Try to access to a password owned by someone else
        let octopass = new Octopass.default("1234567")
        await octopass.login("Test", "Test")
        let otherUserPassList = await octopass.getPasswordManager().listUserPasswords()
        let isError = false
        try {
            let ret = await octopass.getPasswordManager().getPassword("5a6c6ae0afd4300018e46862")
        } catch (err) {
            isError = true
        }
        assert.isTrue(isError)
    })
})