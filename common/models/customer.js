const uuid = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')

module.exports = function (Customer) {
    // GET
    Customer.get = function (callback) {
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'SELECT * FROM public."customers"',
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error retrieving customer:', err)
                        callback(err)
                    } else {
                        const customer = result.rows
                        callback(null, customer)
                    }
                }
            )
        })
    }
    Customer.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        returns: { arg: 'customer', type: 'array', root: true }
    })

    // POST
    Customer.create = function (data, callback) {
        const { name, username, password } = data
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'INSERT INTO public."customers" (id, name, username, password) VALUES ($1, $2, $3, $4) RETURNING *',
                [uuid, name, username, password],
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error inserting customer:', err)
                        callback(err)
                    } else {
                        const customer = result.rows[0]
                        callback(null, customer)
                    }
                }
            )
        })
    }
    Customer.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'customer', type: 'object', root: true }
    })

    // PUT
    Customer.update = function (id, data, callback) {
        const { name, username, password } = data
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'UPDATE public."customers" SET name = $1, username = $2, password = $3 WHERE id = $4 RETURNING *',
                [name, username, password, id],
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error updating customer:', err)
                        callback(err)
                    } else {
                        const customer = result.rows[0]
                        callback(null, customer)
                    }
                }
            )
        })
    }
    Customer.remoteMethod('update', {
        http: { verb: 'put', path: '/:id' },
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        returns: { arg: 'customer', type: 'object', root: true }
    })

    // DELETE
    Customer.delete = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'DELETE FROM public."customers" WHERE id = $1 RETURNING *',
                [id],
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error deleting customer:', err)
                        callback(err)
                    } else {
                        const customer = result.rows[0]
                        callback(null, customer)
                    }
                }
            )
        })
    }
    Customer.remoteMethod('delete', {
        http: { verb: 'delete', path: '/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'customer', type: 'object', root: true }
    })
}
