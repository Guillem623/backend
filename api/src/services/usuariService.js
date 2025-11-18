const Usuari = require('../model/usuari');
const jwt = require("jsonwebtoken");


// Crear un nou usuari
const createUsuari = async (dades) => {
  const nouUsuari = new Usuari(dades);
  return await nouUsuari.save();
};

// Llistar tots els usuaris
const getAllUsuaris = async () => {
  return await Usuari.find();
};

// Obtenir un usuari per ID
const getUsuariById = async (id) => {
  return await Usuari.findById(id);
};

// Actualitzar un usuari
const updateUsuari = async (id, dades) => {
  return await Usuari.findByIdAndUpdate(id, dades, { new: true });
};

// Eliminar un usuari
const deleteUsuari = async (id) => {
  return await Usuari.findByIdAndDelete(id);
};

// Generar el token
const generarToken = (usuari) => {
  return jwt.sign(
    { id: usuari._id, correu: usuari.correu, rol: usuari.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Registrar usuari
exports.registrar = async (dades) => {
  const nouUsuari = new Usuari(dades);
  await nouUsuari.save();

  return {
    usuari: nouUsuari,
    token: generarToken(nouUsuari)
  };
};

// Login usuari
exports.login = async (correu, contrasenya) => {
  const usuari = await Usuari.findOne({ correu });
  if (!usuari) throw new Error("Aquest correu no està registrat");

  const correcte = await usuari.compararContrasenya(contrasenya);
  if (!correcte) throw new Error("Contrasenya incorrecta");

  return {
    usuari,
    token: generarToken(usuari)
  };
};

module.exports = {
  createUsuari,
  getAllUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari,
  registrar,
  login
};