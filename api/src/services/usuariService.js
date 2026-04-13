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

// Registrar usuari
const registre = async (dades) => {
  const nouUsuari = new Usuari(dades);

  const refreshToken = generarRefreshToken(nouUsuari);
  nouUsuari.refreshToken = refreshToken;
  
  await nouUsuari.save();

  return {
    usuari: nouUsuari,
    accessToken: generarAccessToken(nouUsuari),
    refreshToken
  };
};

// Login usuari
const login = async (correu, contrasenya) => {
  const usuari = await Usuari.findOne({ correu });
  if (!usuari) throw new Error("Aquest correu no està registrat");

  const correcte = await usuari.compararContrasenya(contrasenya);
  if (!correcte) throw new Error("Contrasenya incorrecta");

  const refreshToken = generarRefreshToken(usuari);

  usuari.refreshToken = refreshToken;
  await usuari.save();

  return {
    usuari,
    accessToken: generarAccessToken(usuari),
    refreshToken
  };
};

const generarAccessToken = (usuari) => {
  return jwt.sign(
    { id: usuari._id, correu: usuari.correu, rol: usuari.rol },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generarRefreshToken = (usuari) => {
  return jwt.sign(
    { id: usuari._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const refresh = async (refreshToken) => {

  if (!refreshToken) throw new Error("No hi ha refresh token");

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const usuari = await Usuari.findById(decoded.id);
  if (!usuari || usuari.refreshToken !== refreshToken) {
    throw new Error("Refresh token invàlid");
  }

  return {
    accessToken: generarAccessToken(usuari)
  };
};

const logout = async (refreshToken) => {

  if (!refreshToken) throw new Error("No hi ha refresh token");

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const usuari = await Usuari.findById(decoded.id);

  if (!usuari) throw new Error("Usuari no trobat");

  usuari.refreshToken = null;
  await usuari.save();

  return { missatge: "Logout correcte" };
};

module.exports = {
  createUsuari,
  getAllUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari,
  registre,
  login,
  refresh,
  logout
};