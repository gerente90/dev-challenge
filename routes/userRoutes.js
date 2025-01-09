const express = require('express');
const { registerUser } = require('../controllers/usercontroller');  // Asegúrate de importar la función correctamente

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
    const { name, lastname, ruc, email } = req.body;
  
    if (!name || !lastname || !ruc || !email) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    // Aquí podrías guardar el usuario en la base de datos
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  });
  

module.exports = router;

