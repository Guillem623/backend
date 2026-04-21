const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtenir la cistella actual
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cistella retornada correctament
 */
router.get('/', controller.obtenirCistella);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Afegir producte a la cistella
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               preu:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producte afegit correctament
 */
router.post('/add', controller.afegirACistella);

/**
 * @swagger
 * /api/cart/remove/{index}:
 *   delete:
 *     summary: Eliminar producte de la cistella
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producte eliminat correctament
 */
router.delete('/remove/:index', controller.eliminarDeCistella);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Realitzar compra
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Compra realitzada correctament
 *       401:
 *         description: No autoritzat
 */
router.post('/checkout', authMiddleware, controller.checkout);

module.exports = router;