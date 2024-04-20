const { uuid } = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')
const Constant = require('../../server/utils/Constant')
const moment = require('moment')
const authentication = require('../../server/utils/Authentication')
const { response, error_response } = require('../../server/utils/Response')

module.exports = function (Order) {
    // GET
    Order.get = function (payload, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'SELECT o.id, o.customer_id, o.total, o.date, o.status, json_agg(oi) AS order_items FROM public."orders" AS o LEFT JOIN public."order_items" AS oi ON o.id = oi.order_id GROUP BY o.id, o.customer_id, o.total, o.date, o.status',
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        let order = result.rows
                        order = order.map((value) => {
                            return {
                                ...value,
                                total: parseFloat(value.total)
                            }
                        })
                        if (payload.role == Constant.ROLE_CUSTOMER) {
                            order = order.filter((value) => value.customer_id == payload.id)
                        }
                        callback(null, response(200, 'Get Order List Success', order))
                    }
                }
            )
        })
    }
    Order.beforeRemote('get', (ctx, unused, next) => authentication(ctx, unused, next))
    Order.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        accepts: { arg: 'payload', type: 'object' },
        returns: { arg: 'order', type: 'array', root: true }
    })

    // CREATE
    Order.create = function (total, items, payload, callback) {
        const orderId = uuid()
        const arrayItems = JSON.parse(items)
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'INSERT INTO public.orders(id, customer_id, total, date, status) VALUES ($1, $2, $3, $4, $5)',
                [orderId, payload.id, total, moment().utcOffset(420).format('YYYY/MM/DD HH:mm:ss'), Constant.STATUS_PENDING],
                (err, result) => {
                    if (err) {
                        done(err) // Release client if error
                        callback(null, error_response(err.message))
                        return
                    }
                    const insertItemQueries = arrayItems.map((item) => {
                        return new Promise((resolve, reject) => {
                            client.query(
                                'INSERT INTO public.order_items(id, order_id, name, price, quantity, subtotal) VALUES ($1, $2, $3, $4, $5, $6)',
                                [uuid(), orderId, item.name, item.price, item.quantity, item.subtotal],
                                (err, result) => {
                                    if (err) {
                                        reject(err)
                                        return
                                    }
                                    resolve()
                                }
                            )
                        })
                    })
                    Promise.all(insertItemQueries)
                        .then(() => {
                            done()
                            callback(null, response(200, 'Create Order Success'))
                        })
                        .catch((err) => {
                            done(err)
                            callback(null, error_response(err.message))
                        })
                }
            )
        })
    }
    Order.beforeRemote('create', (ctx, unused, next) => authentication(ctx, unused, next, Constant.ROLE_CUSTOMER))
    Order.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: [
            { arg: 'total', type: 'string', http: { source: 'formData' } },
            { arg: 'items', type: 'string', http: { source: 'formData' } },
            { arg: 'payload', type: 'object' }
        ],
        returns: { arg: 'order', type: 'object', root: true }
    })

    // PROCESS
    Order.process = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."orders" SET status = $1 WHERE id = $2',
                [Constant.STATUS_PROCESS, id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Process Order Success'))
                    }
                }
            )
        })
    }
    Order.beforeRemote('process', (ctx, unused, next) => authentication(ctx, unused, next, Constant.ROLE_ADMIN))
    Order.remoteMethod('process', {
        http: { verb: 'put', path: '/process/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'order', type: 'object', root: true }
    })

    // DONE
    Order.done = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                callback(null, error_response(err.message))
                return
            }
            client.query(
                'UPDATE public."orders" SET status = $1 WHERE id = $2',
                [Constant.STATUS_DONE, id],
                (err, result) => {
                    done()
                    if (err) {
                        callback(null, error_response(err.message))
                    } else {
                        callback(null, response(200, 'Done Order Success'))
                    }
                }
            )
        })
    }
    Order.beforeRemote('done', (ctx, unused, next) => authentication(ctx, unused, next, Constant.ROLE_ADMIN))
    Order.remoteMethod('done', {
        http: { verb: 'put', path: '/done/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'order', type: 'object', root: true }
    })
}
