const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')
const { resp } = require('../../server/utils/Response')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = function (Customer) {
    // GET
    // Customer.get = function (callback) {
    //     db.connect((err, client, done) => {
    //         if (err) {
    //             callback(err)
    //             return
    //         }
    //         client.query(
    //             'SELECT * FROM public."customers"',
    //             (err, result) => {
    //                 done()
    //                 if (err) {
    //                     callback(err)
    //                 } else {
    //                     const customer = result.rows
    //                     callback(null, customer)
    //                 }
    //             }
    //         )
    //     })
    // }
    // Customer.remoteMethod('get', {
    //     http: { verb: 'get', path: '/' },
    //     returns: { arg: 'customer', type: 'array', root: true }
    // })

    // POST
    Customer.login = function (username, password, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'SELECT * FROM public."customers" WHERE username = $1 AND password = $2',
                [username, password],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const customer = result.rows[0]
                        const token = jwt.sign({ 
                            id: customer.id,
                            name: customer.name,
                            username: customer.username
                         }, process.env.SECRET_KEY)
                        callback(null, resp(200, 'Login Customer Success', {
                            id: customer.id,
                            name: customer.name,
                            username: customer.username,
                            token: token
                        }))
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
    // Customer.create = function (data, callback) {
    //     const { name, username, password } = data
    //     db.connect((err, client, done) => {
    //         if (err) {
    //             callback(err)
    //             return
    //         }
    //         client.query(
    //             'INSERT INTO public."customers" (id, name, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
    //             [uuid(), name, username, password],
    //             (err, result) => {
    //                 done()
    //                 if (err) {
    //                     callback(err)
    //                 } else {
    //                     const customer = result.rows[0]
    //                     callback(null, customer)
    //                 }
    //             }
    //         )
    //     })
    // }
    // Customer.remoteMethod('create', {
    //     http: { verb: 'post', path: '/' },
    //     accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    //     returns: { arg: 'customer', type: 'object', root: true }
    // })

    // PUT
    // Customer.update = function (id, data, callback) {
    //     const { name, username, password } = data
    //     db.connect((err, client, done) => {
    //         if (err) {
    //             callback(err)
    //             return
    //         }
    //         client.query(
    //             'UPDATE public."customers" SET name = $1, username = $2, password = $3 WHERE id = $4 RETURNING *',
    //             [name, username, password, id],
    //             (err, result) => {
    //                 done()
    //                 if (err) {
    //                     callback(err)
    //                 } else {
    //                     const customer = result.rows[0]
    //                     callback(null, customer)
    //                 }
    //             }
    //         )
    //     })
    // }
    // Customer.remoteMethod('update', {
    //     http: { verb: 'put', path: '/:id' },
    //     accepts: [
    //         { arg: 'id', type: 'string', required: true },
    //         { arg: 'data', type: 'object', http: { source: 'body' } }
    //     ],
    //     returns: { arg: 'customer', type: 'object', root: true }
    // })

    // DELETE
    // Customer.delete = function (id, callback) {
    //     db.connect((err, client, done) => {
    //         if (err) {
    //             callback(err)
    //             return
    //         }
    //         client.query(
    //             'DELETE FROM public."customers" WHERE id = $1 RETURNING *',
    //             [id],
    //             (err, result) => {
    //                 done()
    //                 if (err) {
    //                     callback(err)
    //                 } else {
    //                     const customer = result.rows[0]
    //                     callback(null, customer)
    //                 }
    //             }
    //         )
    //     })
    // }
    // Customer.remoteMethod('delete', {
    //     http: { verb: 'delete', path: '/:id' },
    //     accepts: { arg: 'id', type: 'string', required: true },
    //     returns: { arg: 'customer', type: 'object', root: true }
    // })
}
