const express = require('express');
const router = express.Router();
const controller = require('../controllers/alimentsController');

router.post('/', controller.crearAliment);
router.get('/', controller.obtenirAliments);
router.get('/:id', controller.obtenirAliment);
router.put('/:id', controller.actualitzarAliment);
router.delete('/:id', controller.eliminarAliment);

module.exports = router;