const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')

module.exports = function (Order) {
    // GET
    Order.get = function (callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'SELECT * FROM public."orders"',
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
    Order.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        returns: { arg: 'order', type: 'array', root: true }
    })

    // POST
    Order.create = function (data, callback) {
        const { customer_id, date, status } = data
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'INSERT INTO public."orders" (id, customer_id, date, status) VALUES ($1, $2, $3, $4) RETURNING *',
                [uuid(), customer_id, date, status],
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
    Order.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'order', type: 'object', root: true }
    })

    // PUT
    Order.update = function (id, data, callback) {
        const { customer_id, date, status } = data
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'UPDATE public."orders" SET customer_id = $1, date = $2, status = $3 WHERE id = $4 RETURNING *',
                [customer_id, date, status, id],
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
    Order.remoteMethod('update', {
        http: { verb: 'put', path: '/:id' },
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        returns: { arg: 'order', type: 'object', root: true }
    })

    // DELETE
    Order.delete = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(err)
                return
            }
            client.query(
                'DELETE FROM public."orders" WHERE id = $1 RETURNING *',
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
    Order.remoteMethod('delete', {
        http: { verb: 'delete', path: '/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'order', type: 'object', root: true }
    })
}
