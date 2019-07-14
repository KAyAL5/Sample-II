module.exports = {
    dbCon: 'mongodb://localhost:27017/sample',
    jwt: {
        secret: "xtytzt00700tytx",
        expiration: 1800
    },
    encrypt: {
        algorithm: 'aes-256-ctr',
        password: 'd6F3Efeq',
    },
    email: {
        from: '"Kayal" <no-reply@gmail.com>',
        user: '',
        userkey: '',
    },
    faye: {
        mount: '/faye',
        timeout: 45
    },
    redis: {
        user: "",
        password: "",
        host: "",
        port: 6379
    }
}