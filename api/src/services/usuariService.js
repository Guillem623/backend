const Usuari = require('../model/usuari');

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

module.exports = {
  createUsuari,
  getAllUsuaris,
  getUsuariById,
  updateUsuari,
  deleteUsuari
};