const bcrypt = require('bcrypt');
const User = require('../models/user');
const { identity } = require('lodash');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, lastname, identity, number, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    await User.create({
      name,
      lastname,
      identity,
      number,
      email,
      password: hashedPassword,
    });

    res.redirect('/login'); // Redirigir al login después del registro
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Controlador para iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Guardar información del usuario en la sesión
    req.session.user = { id: user.id, name: user.name, isSuperuser: user.isSuperuser };
    console.log('Usuario autenticado:', req.session.user); 

    res.json({
      message: 'Inicio de sesión exitoso',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
    res.clearCookie('connect.sid'); // Elimina la cookie de sesión
    res.redirect('/login'); // Redirige al login
  });
};


// Controlador para crear super usuarios.
const createSuperuser = async (req, res) => {
  try {
    const users = [
      { name: 'Admin1', lastname: 'User1', identity: '00000000', number: '000-0000', email: 'admin1@example.com', password: 'password1' },
      { name: 'Admin2', lastname: 'User2', identity: '00000001', number: '0000-000', email: 'admin2@example.com', password: 'password2' },
    ];

    for (const userData of users) {
      const { name, lastname, identity, number, email, password } = userData;

      // Verificar si el superusuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
          name,
          lastname,
          identity,
          number,
          email,
          password: hashedPassword,
          isSuperuser: true,
        });
      }
    }

    return res.json({ message: 'Superusuarios creados correctamente.' });
  } catch (error) {
    console.error('Error al crear los superusuarios:', error);
    return res.status(500).json({ error: 'Error al crear los superusuarios' });
  }
};



module.exports = { registerUser, loginUser, logoutUser, createSuperuser };