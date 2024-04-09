const { Router } = require('express')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()


// Controller
const usersController = new UsersController()


// Rotas
usersRoutes.post('/create', usersController.create)
usersRoutes.post('/login', usersController.login)
usersRoutes.get('/show', ensureAuthenticated, usersController.show)
usersRoutes.put('/update/:id', usersController.update)
usersRoutes.delete('/delete/:id', usersController.delete)

// Exporta
module.exports = usersRoutes