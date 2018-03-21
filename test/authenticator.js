const assert = require('chai').assert
const Octopass = require('../dist/octopass')
const mockup = require('./mockups/authenticatorMockup')

octopass = new Octopass.default("1234567")

describe('Test authentication function', () => {

    it('should return accessToken', async () => {        
        let ret = await octopass.getAuthenticator().login("Jdoe", "Test")
        assert.typeOf(ret, 'object')
        assert.notStrictEqual(ret.token, undefined)
        assert.equal(ret.message, "User connected")
    })

    it ('should not return accessToken', async () => {
        try {
            let ret = await octopass.getAuthenticator().login("azertyu", "nope")
        } catch(err) {
            assert.equal(err.code, 401)
        }
    })

    it ('should throw an exeption', async () => {
        try {
            let ret = await octopass.getAuthenticator().login()
        } catch (err) {
            assert.equal(err.message, "You need to specify username and password")
        }
    })
})