const usuariService = require('../services/usuariService');

// Crear usuari
const crearUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.createUsuari(req.body);
    res.status(201).json(usuari);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tots els usuaris
const obtenirUsuaris = async (req, res) => {
  try {
    const usuaris = await usuariService.getAllUsuaris();
    res.json(usuaris);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un usuari per ID
const obtenirUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.getUsuariById(req.params.id);
    if (!usuari) return res.status(404).json({ error: 'Usuari no trobat' });
    res.json(usuari);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualitzar usuari
const actualitzarUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.updateUsuari(req.params.id, req.body);
    if (!usuari) return res.status(404).json({ error: 'Usuari no trobat' });
    res.json(usuari);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuari
const eliminarUsuari = async (req, res) => {
  try {
    const usuari = await usuariService.deleteUsuari(req.params.id);
    if (!usuari) return res.status(404).json({ error: 'Usuari no trobat' });
    res.json({ missatge: 'Usuari eliminat correctament' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuari,
  obtenirUsuaris,
  obtenirUsuari,
  actualitzarUsuari,
  eliminarUsuari
};