require('dotenv').config();
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const path = require('path');  // Importa path
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

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para sesiones
app.use(session({
  secret: 'tu_secreto_seguro', 
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Asigna `null` si no hay sesión activa
  console.log('Usuario actual en sesión:', res.locals.user); // Verifica el estado
  next();
});

// Middleware para manejar archivos estáticos y datos
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas HTML
app.get('/', (req, res) => {
  res.render('index');  // Usa EJS para renderizar la vista index.ejs
});

app.get('/index', (req, res) => {
  res.render('index');  // Usa EJS para renderizar la vista index.ejs
});

app.get('/features', (req, res) => {
  res.render('features');  // Usa EJS para renderizar la vista features.ejs
});

app.get('/info', (req, res) => {
  res.render('info');  // Usa EJS para renderizar la vista info.ejs
});

app.get('/join', (req, res) => {
  res.render('join');  // Usa EJS para renderizar la vista join.ejs
});

app.get('/login', (req, res) => {
  res.render('login');  // Usa EJS para renderizar la vista login.ejs
});

app.get('/rewards', (req, res) => {
  res.render('rewards');  // Usa EJS para renderizar la vista rewards.ejs
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

