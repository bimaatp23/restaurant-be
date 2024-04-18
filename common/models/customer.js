const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')
const { response, error_response } = require('../../server/utils/Response')
const jwt = require('jsonwebtoken')
const authentication = require('../../server/utils/Authentication')
const dotenv = require('dotenv').config()
const Constant = require('../../server/utils/Constant')

module.exports = function (Customer) {
    // LOGIN
    Customer.login = function (username, password, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'SELECT * FROM public."customers" WHERE username = $1 AND password = $2',
                [username, password],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        const customer = result.rows
                        if (customer.length == 0) {
                            callback(null, response(401, 'Invalid Username or Password'))
                        } else {
                            const token = jwt.sign({
                                id: customer[0].id,
                                name: customer[0].name,
                                username: customer[0].username,
                                role: Constant.ROLE_CUSTOMER
                            }, process.env.SECRET_KEY)
                            callback(null, response(200, 'Login Customer Success', {
                                id: customer[0].id,
                                name: customer[0].name,
                                username: customer[0].username,
                                role: Constant.ROLE_CUSTOMER,
                                token: token
                            }))
                        }
                    }
                }
            )
        })
    }
    Customer.remoteMethod('login', {
        http: { verb: 'post', path: '/login' },
        accepts: [
            { arg: 'username', type: 'string', http: { source: 'formData' } },
            { arg: 'password', type: 'string', http: { source: 'formData' } }
        ],
        returns: { arg: 'customer', type: 'object', root: true }
    })

    // REGISTER
    Customer.register = function (name, username, password, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'INSERT INTO public."customers" (id, name, username, password) VALUES ($1, $2, $3, $4)',
                [uuid(), name, username, password],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Register Customer Success'))
                    }
                }
            )
        })
    }
    Customer.remoteMethod('register', {
        http: { verb: 'post', path: '/register' },
        accepts: [
            { arg: 'name', type: 'string', http: { source: 'formData' } },
            { arg: 'username', type: 'string', http: { source: 'formData' } },
            { arg: 'password', type: 'string', http: { source: 'formData' } },
        ],
        returns: { arg: 'customer', type: 'object', root: true }
    })

    // CHANGE PASSWORD
    Customer.changePassword = function (new_password, payload, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."customers" SET password = $1 WHERE id = $2',
                [new_password, payload.id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Change Password Customer Success'))
                    }
                }
            )
        })
    }
    Customer.beforeRemote('changePassword', authentication)
    Customer.remoteMethod('changePassword', {
        http: { verb: 'put', path: '/change-password' },
        accepts: [
            { arg: 'new_password', type: 'string', http: { source: 'formData' } },
            { arg: 'payload', type: 'object' }
        ],
        returns: { arg: 'customer', type: 'object', root: true }
    })

    // UPDATE
    Customer.update = function (name, username, payload, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."customers" SET name = $1, username = $2 WHERE id = $3',
                [name, username, payload.id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Update Profile Customer Success'))
                    }
                }
            )
        })
    }
    Customer.beforeRemote('update', authentication)
    Customer.remoteMethod('update', {
        http: { verb: 'put', path: '/update' },
        accepts: [
            { arg: 'name', type: 'string', http: { source: 'formData' } },
            { arg: 'username', type: 'string', http: { source: 'formData' } },
            { arg: 'payload', type: 'object' }
        ],
        returns: { arg: 'customer', type: 'object', root: true }
    })
}
