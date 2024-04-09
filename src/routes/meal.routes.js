const { Router } = require('express')


const MealController = require('../controllers/MealController')

const mealRoutes = Router()

// Controller
const mealController = new MealController()


// Rotas
mealRoutes.post('/create', mealController.create)
// mealRoutes.get('/show', usersController.show)
mealRoutes.put('/update/:id', mealController.update)
mealRoutes.delete('/delete/:id', mealController.delete)
// Exporta
module.exports = mealRoutes