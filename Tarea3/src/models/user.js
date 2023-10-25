const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    clave: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now },
    aceptoTerminos: { type: Boolean, required: true }
});

module.exports = User = mongoose.model('user', UserSchema);