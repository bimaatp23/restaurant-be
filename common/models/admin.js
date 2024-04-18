const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')
const { response, error_response } = require('../../server/utils/Response')
const jwt = require('jsonwebtoken')
const authentication = require('../../server/utils/Authentication')
const dotenv = require('dotenv').config()
const Constant = require('../../server/utils/Constant')

module.exports = function (Admin) {
    // LOGIN
    Admin.login = function (username, password, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'SELECT * FROM public."admins" WHERE username = $1 AND password = $2',
                [username, password],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        const admin = result.rows
                        if (admin.length == 0) {
                            callback(null, response(401, 'Invalid Username or Password'))
                        } else {
                            const token = jwt.sign({
                                id: admin[0].id,
                                name: admin[0].name,
                                username: admin[0].username,
                                role: Constant.ROLE_ADMIN
                            }, process.env.SECRET_KEY)
                            callback(null, response(200, 'Login Admin Success', {
                                id: admin[0].id,
                                name: admin[0].name,
                                username: admin[0].username,
                                role: Constant.ROLE_ADMIN,
                                token: token
                            }))
                        }
                    }
                }
            )
        })
    }
    Admin.remoteMethod('login', {
        http: { verb: 'post', path: '/login' },
        accepts: [
            { arg: 'username', type: 'string', http: { source: 'formData' } },
            { arg: 'password', type: 'string', http: { source: 'formData' } }
        ],
        returns: { arg: 'admin', type: 'object', root: true }
    })

    // CHANGE PASSWORD
    Admin.changePassword = function (new_password, payload, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."admins" SET password = $1 WHERE id = $2',
                [new_password, payload.id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Change Password Admin Success'))
                    }
                }
            )
        })
    }
    Admin.beforeRemote('changePassword', authentication)
    Admin.remoteMethod('changePassword', {
        http: { verb: 'put', path: '/change-password' },
        accepts: [
            { arg: 'new_password', type: 'string', http: { source: 'formData' } },
            { arg: 'payload', type: 'object' }
        ],
        returns: { arg: 'admin', type: 'object', root: true }
    })

    // UPDATE
    Admin.update = function (name, username, payload, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."admins" SET name = $1, username = $2 WHERE id = $3',
                [name, username, payload.id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Update Profile Admin Success'))
                    }
                }
            )
        })
    }
    Admin.beforeRemote('update', authentication)
    Admin.remoteMethod('update', {
        http: { verb: 'put', path: '/update' },
        accepts: [
            { arg: 'name', type: 'string', http: { source: 'formData' } },
            { arg: 'username', type: 'string', http: { source: 'formData' } },
            { arg: 'payload', type: 'object' }
        ],
        returns: { arg: 'admin', type: 'object', root: true }
    })
}
