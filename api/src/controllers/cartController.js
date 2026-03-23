const cartService = require('../services/cartService');

const obtenirCistella = async (req, res) => {
  try {
    const cart = await cartService.getCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const afegirACistella = async (req, res) => {
  try {

    const producte = req.body;

    const cart = await cartService.addToCart(producte);

    res.json(cart);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};

const eliminarDeCistella = async (req, res) => {
  try {
    const index = req.params.index;
    const cart = await cartService.removeItem(index);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkout = async (req, res) => {

  try {

    const token = req.headers.authorization.split(" ")[1];

    const resultat = await cartService.checkout(token);

    res.json(resultat);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

module.exports = {
  obtenirCistella,
  afegirACistella,
  eliminarDeCistella,
  checkout
};