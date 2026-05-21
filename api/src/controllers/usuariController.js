const usuariService = require('../services/usuariService');
const Comanda = require('../model/comanda');
const jwt = require('jsonwebtoken');

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

// REGISTRE d'usuari
const registre = async (req, res) => {
  try {
    const resultat = await usuariService.registre(req.body);
    res.status(201).json(resultat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN d'usuari
const login = async (req, res) => {
  try {
    const { correu, contrasenya } = req.body;
    const resultat = await usuariService.login(correu, contrasenya);
    req.log.info({ userId: resultat.usuari._id, email: resultat.usuari.correu }, 'User logged in successfully');
    res.json(resultat);
  } catch (error) {
    req.log.warn({ email: req.body.correu }, 'Invalid login attempt');
    res.status(400).json({ error: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const resultat = await usuariService.refresh(refreshToken);

    res.json(resultat);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const resultat = await usuariService.logout(refreshToken);
    req.log.info({ userId: req.user?.id || req.user?.userId || 'unknown' }, 'User logged out');
    res.json(resultat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Obtenir compres de l'usuari actual
const obtenirCompresUsuari = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const compres = await Comanda.find({ usuariId: decoded.id });
    res.json(compres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuari,
  obtenirUsuaris,
  obtenirUsuari,
  actualitzarUsuari,
  eliminarUsuari,
  registre,
  login,
  refresh,
  logout,
  obtenirCompresUsuari
};
