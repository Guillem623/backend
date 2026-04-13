const Comanda = require("../model/comanda");
const jwt = require("jsonwebtoken");

let cart = {
  items: [],
  total: 0
};

const getCart = async () => {
  return cart;
};

const addToCart = async (producte) => {

  cart.items.push(producte);

  cart.total += producte.preu;

  return cart;
};

const removeItem = async (index) => {

  cart.items.splice(index, 1);

  cart.total = cart.items.reduce((sum, item) => sum + item.preu, 0);

  return cart;
};

const checkout = async (token) => {

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const comanda = new Comanda({

    usuariId: decoded.id,
    items: cart.items,
    total: cart.total

  });

  await comanda.save();

  const resposta = {
    missatge: "Compra realitzada correctament",
    total: cart.total
  };

  // 🔹 Buidar cistella
  cart.items = [];
  cart.total = 0;

  return resposta;

};

module.exports = {
  getCart,
  addToCart,
  removeItem,
  checkout
};