const cartService = require('../services/cartService');

const obtenirCistella = async (req, res) => {
  try {
    const cart = await cartService.getCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenirCistella
};