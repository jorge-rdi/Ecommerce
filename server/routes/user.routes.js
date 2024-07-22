const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

//--------------------------RECUPERAR CONTRASENIA---------------------------------------------------->
router.get("/resetPassword", UserController.passwordResetToken);
router.patch("/resetPassword", UserController.passwordReset);

//--------------------------RUTAS CRUD------------------------------------------------->
router.post("/new", UserController.createUser);
router.get("/all", authenticate, UserController.findAllUsers);
router.get("/:id", authenticate, UserController.findUser);
router.put("/:id", authenticate, UserController.updateUser);
router.delete("/:id", authenticate, UserController.deleteUser);
module.exports = router;