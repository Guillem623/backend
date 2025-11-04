require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const alimentRoutes = require('./routes/alimentRoutes');
const usuariRoutes = require('./routes/usuariRoutes');

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('API d’Aliments i Usuaris en marxa'));
app.use('/api/aliment', alimentRoutes);
app.use('/api/usuari', usuariRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));