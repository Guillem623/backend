const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({

  usuari: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuari",
    required: true
  },

  productes: [
    {
      nom: String,
      preu: Number
    }
  ],

  total: Number,

  data: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Compra", compraSchema);