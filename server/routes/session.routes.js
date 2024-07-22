const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

//------------------------RUTAS DE SESION-------------------------------------------->
router.post("/login", UserController.login);
router.delete("/logout", authenticate, UserController.loggout);

module.exports = router;