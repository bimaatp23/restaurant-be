const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')

module.exports = function (Menu) {
    // GET
    Menu.get = function (callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'SELECT * FROM public."menus"',
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const menu = result.rows
                        callback(null, menu)
                    }
                }
            )
        })
    }
    Menu.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        returns: { arg: 'menu', type: 'array', root: true }
    })

    // POST
    Menu.create = function (data, callback) {
        const { name, description, price } = data
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'INSERT INTO public."menus" (id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
                [uuid(), name, description, price],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const menu = result.rows[0]
                        callback(null, menu)
                    }
                }
            )
        })
    }
    Menu.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'menu', type: 'object', root: true }
    })

    // PUT
    Menu.update = function (id, data, callback) {
        const { name, description, price } = data
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'UPDATE public."menus" SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
                [name, description, price, id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const menu = result.rows[0]
                        callback(null, menu)
                    }
                }
            )
        })
    }
    Menu.remoteMethod('update', {
        http: { verb: 'put', path: '/:id' },
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        returns: { arg: 'menu', type: 'object', root: true }
    })

    // DELETE
    Menu.delete = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'DELETE FROM public."menus" WHERE id = $1 RETURNING *',
                [id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const menu = result.rows[0]
                        callback(null, menu)
                    }
                }
            )
        })
    }
    Menu.remoteMethod('delete', {
        http: { verb: 'delete', path: '/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'menu', type: 'object', root: true }
    })
}
