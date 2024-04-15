const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')

module.exports = function (OrderItem) {
    // GET
    OrderItem.get = function (callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'SELECT * FROM public."order_items"',
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const order = result.rows
                        callback(null, order)
                    }
                }
            )
        })
    }
    OrderItem.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        returns: { arg: 'order', type: 'array', root: true }
    })

    // POST
    OrderItem.create = function (data, callback) {
        const { order_id, menu_item_id, quantity } = data
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'INSERT INTO public."order_items" (id, order_id, menu_item_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
                [uuid(), order_id, menu_item_id, quantity],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const order = result.rows[0]
                        callback(null, order)
                    }
                }
            )
        })
    }
    OrderItem.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'order', type: 'object', root: true }
    })

    // PUT
    OrderItem.update = function (id, data, callback) {
        const { order_id, menu_item_id, quantity } = data
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'UPDATE public."order_items" SET order_id = $1, menu_item_id = $2, quantity = $3 WHERE id = $4 RETURNING *',
                [order_id, menu_item_id, quantity, id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const order = result.rows[0]
                        callback(null, order)
                    }
                }
            )
        })
    }
    OrderItem.remoteMethod('update', {
        http: { verb: 'put', path: '/:id' },
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        returns: { arg: 'order', type: 'object', root: true }
    })

    // DELETE
    OrderItem.delete = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'DELETE FROM public."order_items" WHERE id = $1 RETURNING *',
                [id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(err)
                    } else {
                        const order = result.rows[0]
                        callback(null, order)
                    }
                }
            )
        })
    }
    OrderItem.remoteMethod('delete', {
        http: { verb: 'delete', path: '/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'order', type: 'object', root: true }
    })
}
