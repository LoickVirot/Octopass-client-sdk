const nock = require('nock')

const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNmE0YjEyYzM5Y2M1MDA0NmZiNTdhYiIsInVzZXJuYW1lIjoiSmRvZSIsImlhdCI6MTUyMTI5NTc1Nn0.IBF-NRyqRw0lnW2zA2BE4Vzhll6fHknvGziz0mhtSe0";
const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNmE0YjEyYzM5Y2M1MDA0NmZiNTdhYiIsInVzZXJuYW1lIjoiSmRvZSIsImlhdCI6MTUyMzQ0MTk1M30.liZ4K9kE4lbzmy_VUBX6uGQ69V5FqyxhCAxpemTdOsQ"

module.exports = nock('http://localhost:8080', {
        reqheaders: {
            'authorization': /.+$/
        }
    })

    .post('/password', {
        "serviceName": 'TestService',
        "password": /.+$/ // Random string
    })
    .reply('200', '5aad219b9939740012161e80')
    
    .get('/user/passwords')
    .reply('200', [
        {
            "_id": "5a6c6ae0afd4300018e46862",
            "serviceName": "TestService",
            "__v": 0
        },
        {
            "_id": "5a6c6fb3b0011201049e596b",
            "serviceName": "Facebook",
            "__v": 0
        },
        {
            "_id": "5a6c71f445d63c013c7d5df9",
            "serviceName": "Twitter",
            "__v": 0
        }
    ])
    
    .get('/5aab906a9939740012161e54/password') // Existing
    .reply('200', {
        "_id": "5aab906a9939740012161e54",
        "serviceName": "TestService",
        "password": "U2FsdGVkX19BI6NVmtbH7zf/waHnzUbiHZUl5kr9NHCJmflu0FoVndSzocR1Fg2D",
        "owner": {
            "_id": "5a6a4b12c39cc50046fb57ab",
            "username": "Jdoe",
            "email": "jdoe@gmail.com",
            "password": "gvFIHePYjeMu4Ws8RB0+346momBflKNvomF1wV/50RAsSHrSZ8htM5yM1n71YAaQTqSOtfMEUVPIdlyF6h+R8urORkCCmTEQOHWnTJ63p64=",
            "__v": 0
        },
        "__v": 0
    })
    
    .get('/5a6c6ae0afd4300018e46862/password') // Other user
    .reply('401', 'You are not allowed to access to this route.')

    .put('/5a6c6ae0afd4300018e46862/password') // Other user
    .reply('401', 'You are not allowed to access to this route.')

    .delete('/5a6c6ae0afd4300018e46862/password') // Other user
    .reply('401', 'You are not allowed to access to this route.')
    
    .delete('/5aab906a9939740012161e54/password')
    .reply('200')

    .put('/5aab906a9939740012161e54/password', {
        "serviceName": "TestUpdate"
    })
    .reply('201', {
        "_id": "5aab906a9939740012161e54",
        "serviceName": "TestUpdate",
        "password": "Test",
        "owner": "5a6a4b12c39cc50046fb57ab",
        "__v": 0
    })

    .put('/5aab906a9939740012161e54/password', {
        "serviceName": "TestService"
    })
    .reply('201', {
        "_id": "5aab906a9939740012161e54",
        "serviceName": "TestService",
        "password": "Test",
        "owner": "5a6a4b12c39cc50046fb57ab",
        "__v": 0
    })

    .put('/5aab906a9939740012161e54/password', {
        "password": "TestUpdate"
    })
    .reply('201', {
        "_id": "5aab906a9939740012161e54",
        "serviceName": "Test",
        "password": "Test",
        "owner": "5a6a4b12c39cc50046fb57ab",
        "__v": 0
    })
    
    .put('/5aab906a9939740012161e54/password', {
        "serviceName": "TestUpdate",        
        "password": "TestUpdate"
    })
    .reply('201', {
        "_id": "5aab906a9939740012161e54",
        "serviceName": "TestUpdate",
        "password": "Test",
        "owner": "5a6a4b12c39cc50046fb57ab",
        "__v": 0
    })
    
    .persist()