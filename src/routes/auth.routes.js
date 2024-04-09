const { Router } = require("express");
const jwt = require("jsonwebtoken");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const AuthController = require('../controllers/AuthController')

const authRoutes = Router()

const authController = new AuthController()


authRoutes.get("/private", ensureAuthenticated, (req, res) => {
        res.status(200).send("funcionou");
    });
  
    authRoutes.post("/logout", ensureAuthenticated, (req, res) => {
        res.status(200).send({ token: null });
    });

    
    authRoutes.get("/me", authController.me);

  module.exports = authRoutes