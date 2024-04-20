const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')
const { response, error_response } = require('../../server/utils/Response')
const authentication = require('../../server/utils/Authentication')
const Constant = require('../../server/utils/Constant')

module.exports = function (Menu) {
    // GET
    Menu.get = function (callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'SELECT * FROM public."menus"',
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        const menu = result.rows.map((data) => {
                            return {
                                id: data.id,
                                name: data.name,
                                description: data.description,
                                price: parseFloat(data.price),
                                image: data.image
                            }
                        })
                        callback(null, response(200, 'Get Menu List Success', menu))
                    }
                }
            )
        })
    }
    Menu.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        returns: { arg: 'menu', type: 'object', root: true }
    })

    // CREATE
    Menu.create = function (name, description, price, image, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'INSERT INTO public."menus" (id, name, description, price, image) VALUES ($1, $2, $3, $4, $5)',
                [uuid(), name, description, price, image],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Create Menu Success'))
                    }
                }
            )
        })
    }
    Menu.beforeRemote('create', (ctx, unused, next) => authentication(ctx, unused, next, Constant.ROLE_ADMIN))
    Menu.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: [
            { arg: 'name', type: 'string', http: { source: 'formData' } },
            { arg: 'description', type: 'string', http: { source: 'formData' } },
            { arg: 'price', type: 'number', http: { source: 'formData' } },
            { arg: 'image', type: 'string', http: { source: 'formData' } }
        ],
        returns: { arg: 'menu', type: 'object', root: true }
    })

    // UPDATE
    Menu.update = function (id, name, description, price, image, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."menus" SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5',
                [name, description, price, image, id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Update Menu Success'))
                    }
                }
            )
        })
    }
    Menu.beforeRemote('update', (ctx, unused, next) => authentication(ctx, unused, next, Constant.ROLE_ADMIN))
    Menu.remoteMethod('update', {
        http: { verb: 'put', path: '/:id' },
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'name', type: 'string', http: { source: 'formData' } },
            { arg: 'description', type: 'string', http: { source: 'formData' } },
            { arg: 'price', type: 'number', http: { source: 'formData' } },
            { arg: 'image', type: 'string', http: { source: 'formData' } }
        ],
        returns: { arg: 'menu', type: 'object', root: true }
    })

    // DELETE
    Menu.delete = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'DELETE FROM public."menus" WHERE id = $1',
                [id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Delete Menu Success'))
                    }
                }
            )
        })
    }
    Menu.beforeRemote('delete', (ctx, unused, next) => authentication(ctx, unused, next, Constant.ROLE_ADMIN))
    Menu.remoteMethod('delete', {
        http: { verb: 'delete', path: '/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'menu', type: 'object', root: true }
    })
}
