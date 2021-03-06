const nock = require('nock')

const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNmE0YjEyYzM5Y2M1MDA0NmZiNTdhYiIsInVzZXJuYW1lIjoiSmRvZSIsImlhdCI6MTUyMTI5NTc1Nn0.IBF-NRyqRw0lnW2zA2BE4Vzhll6fHknvGziz0mhtSe0";
const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNmE0YjEyYzM5Y2M1MDA0NmZiNTdhYiIsInVzZXJuYW1lIjoiSmRvZSIsImlhdCI6MTUyMzQ0MTk1M30.liZ4K9kE4lbzmy_VUBX6uGQ69V5FqyxhCAxpemTdOsQ"


module.exports = nock('http://localhost:8080')
    .post('/auth', {
        username: "Jdoe",
        password: "Test"
    })
    .reply(200, {
        message: "User connected",
        token: token1
    })
    .post('/auth', {
        username: "azertyu",
        password: "nope"
    })
    .reply(401, "Incorrect password")
    .post('/auth', {
        username: "Jdoe",
        password: "Test"
    })
    .reply(200, {
        message: "User connected",
        token: token1
    })

    .post('/auth', {
        username: "Test",
        password: "Test"
    }).reply(200, {
        message: "User connected",
        token: token2
    })
    
    .persist()