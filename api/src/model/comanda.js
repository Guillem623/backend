const mongoose = require('mongoose');

const ComandaSchema = new mongoose.Schema({
  usuariId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuari',
    required: true
  },
  items: [
    {
      nom: String,
      preu: Number
    }
  ],
  total: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comanda', ComandaSchema);