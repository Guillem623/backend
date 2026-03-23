const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get('/', controller.obtenirCistella);
router.post('/add', controller.afegirACistella);
router.delete('/remove/:index', controller.eliminarDeCistella);
router.post('/checkout', controller.checkout);

module.exports = router;