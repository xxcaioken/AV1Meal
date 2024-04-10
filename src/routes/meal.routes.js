const { Router } = require('express')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


const MealController = require('../controllers/MealController')

const mealRoutes = Router()

// Controller
const mealController = new MealController()


// Rotas
mealRoutes.post('/create', mealController.create)
mealRoutes.get('/show', mealController.show)
mealRoutes.get('/showUnique', mealController.showUnique)
mealRoutes.put('/update', mealController.update)
mealRoutes.delete('/delete', mealController.delete)
// Exporta
module.exports = mealRoutes