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
        assert.equal(localStorage.getItem('userToken'), 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNmE0YjEyYzM5Y2M1MDA0NmZiNTdhYiIsInVzZXJuYW1lIjoiSmRvZSIsImlhdCI6MTUyMTI5NTc1Nn0.IBF-NRyqRw0lnW2zA2BE4Vzhll6fHknvGziz0mhtSe0')
    })

    it ('should not return accessToken', async () => {
        try {
            let ret = await octopass.getAuthenticator().login("azertyu", "nope")
        } catch(err) {
            assert.equal(err.response.status, 401)
        }
    })

    it ('should throw an exeption', async () => {
        try {
            let ret = await octopass.getAuthenticator().login()
        } catch (err) {
            assert.equal(err.message, "You need to specify username and password")
        }
    })

    it ('should return user is logged in', async () => {
        await octopass.getAuthenticator().login("Jdoe", "Test")
        assert.isTrue(octopass.getAuthenticator().isLoggedIn())
    })

    it('should return user is not logged in', async () => {
        try {
            await octopass.getAuthenticator().login("azertyu", "nope")        
        } catch (err) {}
        assert.isFalse(octopass.getAuthenticator().isLoggedIn())
    })
})