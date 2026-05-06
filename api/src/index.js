const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const alimentRoutes = require('./routes/alimentRoutes');
const usuariRoutes = require('./routes/usuariRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();

app.use(cors());

// 🔹 Middleware per al webhook de Stripe (ANTES de express.json())
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

// 🔹 Body parser JSON per a les altres rutes
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('API d’Aliments i Usuaris en marxa'));
app.use('/api/aliment', alimentRoutes);
app.use('/api/usuari', usuariRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));