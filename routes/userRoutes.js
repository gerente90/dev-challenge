const express = require('express');
const { registerUser, loginUser, createSuperuser, logoutUser } = require('../controllers/usercontroller');

const router = express.Router();

// Ruta para crear el superusuario
router.post('/create-superuser', createSuperuser);
router.post('/api/users/create-superuser', createSuperuser);

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

//Ruta para cerrar sesión
router.get('/logout', logoutUser)

module.exports = router;
