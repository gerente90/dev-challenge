const bcrypt = require('bcrypt');
const User = require('../models/user');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, lastname, identity, number, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    if (!name || !lastname || !identity || !number || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }      

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      name,
      lastname,
      identity,
      number,
      email,
      password: hashedPassword,
    });

    // Responder con el usuario creado
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

module.exports = {
  registerUser,
};
