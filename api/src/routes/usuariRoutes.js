const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarisController');

router.post('/', controller.crearUsuari);
router.get('/', controller.obtenirUsuaris);
router.get('/:id', controller.obtenirUsuari);
router.put('/:id', controller.actualitzarUsuari);
router.delete('/:id', controller.eliminarUsuari);

module.exports = router;