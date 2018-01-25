const assert = require('assert')
const Octopass = require('../dist/octopass')

octopass = new Octopass.default("1234567")

describe('Octopass Tests', () => {
    it('should return accessToken', async () => {        
        let ret = await octopass.login("Jdoe", "Test")
        assert.notStrictEqual(ret.token, undefined)
        assert.equal(ret.message, "User connected")
    });

    it ('should not return accessToken', async () => {
        try {
            let ret = await octopass.login("azertyu", "nope")
        } catch(err) {
            assert.equal(err.code, 401)
        }
    })
});