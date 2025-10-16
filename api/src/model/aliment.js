const mongoose = require('mongoose');

const AlimentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categoria: {
    type: String,
    enum: ['formatge', 'vi', 'oli', 'xocolata', 'embotit', 'altres'],
    required: true
  },
  origen: { type: String, required: true },
  preu: { type: Number, required: true, min: 0, max: 9999 },
  estoc: { type: Number, required: true, min: 0 },
  descripcio: { type: String },
  dataCaducitat: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Aliment', AlimentSchema);