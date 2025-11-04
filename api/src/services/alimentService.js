const Aliment = require('../models/aliments');

// Crear un aliment nou
const createAliment = async (dades) => {
  const nouAliment = new Aliment(dades);
  return await nouAliment.save();
};

// Llistar tots els aliments
const getAllAliments = async () => {
  return await Aliment.find();
};

// Obtenir un aliment per ID
const getAlimentById = async (id) => {
  return await Aliment.findById(id);
};

// Actualitzar un aliment
const updateAliment = async (id, dades) => {
  return await Aliment.findByIdAndUpdate(id, dades, { new: true });
};

// Eliminar un aliment
const deleteAliment = async (id) => {
  return await Aliment.findByIdAndDelete(id);
};

module.exports = {
  createAliment,
  getAllAliments,
  getAlimentById,
  updateAliment,
  deleteAliment
};
