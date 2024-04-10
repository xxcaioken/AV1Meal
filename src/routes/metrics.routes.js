const { Router } = require('express')


const MetricsController = require('../controllers/MetricsController')

const metricsRoutes = Router()

// Controller
const metricsController = new MetricsController()


// Rotas
metricsRoutes.get('/getMealCount', metricsController.getMealCount)
metricsRoutes.get('/getoutMealCount', metricsController.getoutMealCount)
// mealRoutes.get('/show', mealController.show)
// mealRoutes.get('/showUnique', mealController.showUnique)
// mealRoutes.put('/update', mealController.update)
// mealRoutes.delete('/delete', mealController.delete)
// Exporta
module.exports = metricsRoutes