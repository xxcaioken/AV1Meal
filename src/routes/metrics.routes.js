const { Router } = require('express')


const MetricsController = require('../controllers/MetricsController')

const metricsRoutes = Router()

// Controller
const metricsController = new MetricsController()


// Rotas
metricsRoutes.get('/getMealCount', metricsController.getMealCount)
metricsRoutes.get('/getCorrectMealCount', metricsController.getCorrectMealCount)
metricsRoutes.get('/getoutMealCount', metricsController.getoutMealCount)
metricsRoutes.get('/longest',metricsController.getLongestStreak)

module.exports = metricsRoutes