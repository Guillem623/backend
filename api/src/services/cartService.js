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

  // 🔹 Només buidar el carret sense guardar la comanda
  // La comanda ja s'ha guardat al controlador confirmarCompra
  
  const resposta = {
    missatge: "Carrito vaciado correctamente",
    total: 0
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