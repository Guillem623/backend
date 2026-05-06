const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  usuari: { type: mongoose.Schema.Types.ObjectId, ref: "Usuari" },
  productes: Array,
  total: Number,
  estat: { type: String, default: "pendent" }
});

module.exports = mongoose.model("Order", orderSchema);