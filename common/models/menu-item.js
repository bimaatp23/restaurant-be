const uuid = require('../../server/utils/UUID')
const db = require('../../server/utils/DB')

module.exports = function (Menuitem) {
    // GET
    Menuitem.get = function (callback) {
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'SELECT * FROM public."menu-items"',
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error retrieving menu item:', err)
                        callback(err)
                    } else {
                        const menuItem = result.rows
                        callback(null, menuItem)
                    }
                }
            )
        })
    }
    Menuitem.remoteMethod('get', {
        http: { verb: 'get', path: '/' },
        returns: { arg: 'menuItem', type: 'array', root: true }
    })

    // POST
    Menuitem.create = function (data, callback) {
        const { name, description, price } = data
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'INSERT INTO public."menu-items" (id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
                [uuid, name, description, price],
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error inserting menu item:', err)
                        callback(err)
                    } else {
                        const menuItem = result.rows[0]
                        callback(null, menuItem)
                    }
                }
            )
        })
    }
    Menuitem.remoteMethod('create', {
        http: { verb: 'post', path: '/' },
        accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
        returns: { arg: 'menuItem', type: 'object', root: true }
    })

    // PUT
    Menuitem.update = function (id, data, callback) {
        const { name, description, price } = data
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'UPDATE public."menu-items" SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
                [name, description, price, id],
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error updating menu item:', err)
                        callback(err)
                    } else {
                        const menuItem = result.rows[0]
                        callback(null, menuItem)
                    }
                }
            )
        })
    }
    Menuitem.remoteMethod('update', {
        http: { verb: 'put', path: '/:id' },
        accepts: [
            { arg: 'id', type: 'string', required: true },
            { arg: 'data', type: 'object', http: { source: 'body' } }
        ],
        returns: { arg: 'menuItem', type: 'object', root: true }
    })

    // DELETE
    Menuitem.delete = function (id, callback) {
        db.connect((err, client, done) => {
            if (err) {
                console.error('Error connecting to PostgreSQL:', err)
                callback(err)
                return
            }
            client.query(
                'DELETE FROM public."menu-items" WHERE id = $1 RETURNING *',
                [id],
                (err, result) => {
                    done()
                    if (err) {
                        console.error('Error deleting menu item:', err)
                        callback(err)
                    } else {
                        const menuItem = result.rows[0]
                        callback(null, menuItem)
                    }
                }
            )
        })
    }
    Menuitem.remoteMethod('delete', {
        http: { verb: 'delete', path: '/:id' },
        accepts: { arg: 'id', type: 'string', required: true },
        returns: { arg: 'menuItem', type: 'object', root: true }
    })
}
