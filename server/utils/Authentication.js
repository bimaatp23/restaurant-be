const response = require('../../server/utils/Response')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const authentication = (ctx, unused, next) => {
    const token = ctx.req.query.access_token
    if (token == undefined) {
        ctx.res.status(200)
        ctx.res.send(response(401, 'Access Token is Missing'))
        return
    }
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            ctx.res.status(200)
            ctx.res.send(response(401, 'Invalid Token'))
            return
        }
        next()
    })
}

module.exports = authentication