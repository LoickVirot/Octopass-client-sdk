const assert = require('chai').assert
const Octopass = require('../dist/octopass')

octopass = new Octopass.default("1234567")

describe('Test password manager function', () => {
    beforeEach(async () => {
        await octopass.login("Jdoe", "Test")
    })

    it('should create password', async () => {
        let ret = await octopass.getPasswordManager().createPassword("Test", "TestService")
        assert.typeOf(ret, 'string')
    })
})