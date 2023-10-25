const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).send("Acceso no autorizado. Falta el token.");

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Token no válido.");
    }
};