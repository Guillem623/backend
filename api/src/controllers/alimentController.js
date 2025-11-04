const alimentService = require('../services/alimentsService');

const crearAliment = async (req, res) => {
  try {
    const aliment = await alimentService.createAliment(req.body);
    res.status(201).json(aliment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenirAliments = async (req, res) => {
  try {
    const aliments = await alimentService.getAllAliments();
    res.json(aliments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenirAliment = async (req, res) => {
  try {
    const aliment = await alimentService.getAlimentById(req.params.id);
    if (!aliment) return res.status(404).json({ error: 'Aliment no trobat' });
    res.json(aliment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualitzarAliment = async (req, res) => {
  try {
    const aliment = await alimentService.updateAliment(req.params.id, req.body);
    if (!aliment) return res.status(404).json({ error: 'Aliment no trobat' });
    res.json(aliment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarAliment = async (req, res) => {
  try {
    const aliment = await alimentService.deleteAliment(req.params.id);
    if (!aliment) return res.status(404).json({ error: 'Aliment no trobat' });
    res.json({ missatge: 'Aliment eliminat correctament' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearAliment,
  obtenirAliments,
  obtenirAliment,
  actualitzarAliment,
  eliminarAliment
};