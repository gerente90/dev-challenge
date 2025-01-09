require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del cliente de PostgreSQL
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

});

// Conexión a la base de datos
client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión a la base de datos', err.stack));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use('/public', express.static('public'));

app.use(express.json()); // Para solicitudes application/json
app.use(express.urlencoded({ extended: true })); // Para solicitudes application/x-www-form-urlencoded

// Luego, debes registrar las rutas
app.use(userRoutes);  // Usar las rutas del archivo userRoutes.js
