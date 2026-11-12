const express = require('express');
const { add, shows, update, show, del } = require('../controllers/Controller');

const routes = express.Router()

routes.post('/add', add)
routes.get('/', shows)
routes.put('/:id', update)
routes.get('/course/:id', show)
routes.delete('/:id', del)

module.exports = routes
