require('dotenv').config();
const express = require('express');
const session = require('express-session');
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

// Middleware para sesiones
app.use(session({
  secret: 'tu_secreto_seguro', 
  resave: false,
  saveUninitialized: true,
}));

// Middleware para manejar archivos estáticos y datos
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/features.html', (req, res) => {
  res.sendFile(__dirname + '/views/features.html');
});

app.get('/info.html', (req, res) => {
  res.sendFile(__dirname + '/views/info.html');
});

app.get('/join.html', (req, res) => {
  res.sendFile(__dirname + '/views/join.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/rewards.html', (req, res) => {
  res.sendFile(__dirname + '/views/rewards.html');
});

// Rutas del proyecto
app.use(userRoutes);

// Escuchar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Sincronizar el modelo con la base de datos
const User = require('./models/user');
User.sync({ alter: true })
  .then(() => console.log('Tabla User sincronizada'))
  .catch(err => console.error('Error al sincronizar el modelo User:', err));
