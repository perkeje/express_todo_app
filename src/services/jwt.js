const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const generate_access_token = (user)=> {
    const timestamp = Math.floor(Date.now() / 1000)
    const claims = {
        sub: user.id,
        email: user.email,
        exp: timestamp + parseInt(process.env.JWT_LIFETIME) ,
        iat: timestamp,
    }
    return jwt.sign(claims, process.env.JWT_SECRET)
}

module.exports = generate_access_token