const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserController = require('./src/controllers/users.controllers');
const validateToken = require('./src/middlewares/auth');

const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB on ${process.env.TARGET_DB} database`);
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log("Failed to connect to MongoDB: ", err);
    });

app.post('/registro', UserController.registro);
app.post('/iniciar-sesion', UserController.iniciarSesion);
app.get('/', UserController.obtenerUsuarios);
app.get('/usuario-autenticado', validateToken, (req, res) => {
    res.status(200).json({ user: req.user });
});
