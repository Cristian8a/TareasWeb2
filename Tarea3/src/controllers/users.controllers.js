const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.registro = (req, res) => {
    if (!req.body.aceptoTerminos)
        return res.status(400).send("Debe aceptar los términos y condiciones");

    if (req.body.clave !== req.body.confirmacionClave)
        return res.status(400).send("Las contraseñas no coinciden");

    const nuevoUsuario = new User({
        nombre: req.body.nombre,
        correo: req.body.correo,
        clave: req.body.clave,
        aceptoTerminos: req.body.aceptoTerminos
    });

    nuevoUsuario.save((err, user) => {
        if (err)
            return res.status(500).send(err);

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 86400 });
        res.status(200).json({ auth: true, token: token });
    });
};

exports.iniciarSesion = (req, res) => {
    User.findOne({ correo: req.body.correo }, (err, user) => {
        if (err)
            return res.status(500).send(err);

        if (!user)
            return res.status(404).send("Usuario no encontrado");

        user.comparePassword(req.body.clave, (err, isMatch) => {
            if (err)
                return res.status(500).send(err);

            if (!isMatch)
                return res.status(401).send("Contraseña incorrecta");

            const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 86400 });
            res.status(200).json({ auth: true, token: token });
        });
    });
};

exports.obtenerUsuarios = (req, res) => {
    User.find((err, users) => {
        if (err)
            return res.status(500).send(err);

        res.status(200).json(users);
    });
};