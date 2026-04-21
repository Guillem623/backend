const express = require('express');
const router = express.Router();
const controller = require('../controllers/alimentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Aliments
 *   description: API de productes alimentaris
 */

/**
 * @swagger
 * /api/aliment:
 *   get:
 *     summary: Obtenir tots els aliments
 *     tags: [Aliments]
 *     responses:
 *       200:
 *         description: Llista d'aliments
 */
router.get('/', controller.obtenirAliments);

/**
 * @swagger
 * /api/aliment/{id}:
 *   get:
 *     summary: Obtenir un aliment per ID
 *     tags: [Aliments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aliment trobat
 *       404:
 *         description: No trobat
 */
router.get('/:id', controller.obtenirAliment);

/**
 * @swagger
 * /api/aliment:
 *   post:
 *     summary: Crear un aliment (només admin)
 *     tags: [Aliments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               descripcio:
 *                 type: string
 *               preu:
 *                 type: number
 *     responses:
 *       201:
 *         description: Aliment creat
 */
router.post('/', authMiddleware, roleMiddleware("admin"), controller.crearAliment);

/**
 * @swagger
 * /api/aliment/{id}:
 *   put:
 *     summary: Actualitzar aliment
 *     tags: [Aliments]
 */
router.put('/:id', controller.actualitzarAliment);

/**
 * @swagger
 * /api/aliment/{id}:
 *   delete:
 *     summary: Eliminar aliment
 *     tags: [Aliments]
 */
router.delete('/:id', controller.eliminarAliment);

module.exports = router;