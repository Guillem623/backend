const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuariSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  correu: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'El correu no té un format vàlid']
  },
  contrasenya: { type: String, required: true, minlength: 6 },
  rol: { type: String, enum: ['client', 'admin'], default: 'client' },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now }
});

usuariSchema.pre("save", async function (next) {
  if (!this.isModified("contrasenya")) return next();
  const salt = await bcrypt.genSalt(10);
  this.contrasenya = await bcrypt.hash(this.contrasenya, salt);
  next();
});

usuariSchema.methods.compararContrasenya = function (contrasenyaEntrada) {
  return bcrypt.compare(contrasenyaEntrada, this.contrasenya);
};

module.exports = mongoose.model('Usuari', usuariSchema);