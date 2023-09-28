const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const {engine} = require('express-handlebars');
const authMiddleware = require('./src/middlewares/auth');

const port = process.env.PORT || 3100;

dotenv.config();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', (req, res) => {
  const query = req.query.query; 
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(authMiddleware);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => {
    res.render('home');
  });

app.get('/', (req, res) => {
// Renderiza una vista Handlebars llamada "home" en este ejemplo
res.render('home');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
