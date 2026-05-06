const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Usuaris
 *   description: Gestió d'usuaris i autenticació
 */

/**
 * @swagger
 * /api/usuari/registre:
 *   post:
 *     summary: Registrar un nou usuari
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               correu:
 *                 type: string
 *               contrasenya:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuari registrat correctament
 */
router.post("/registre", controller.registre);

/**
 * @swagger
 * /api/usuari/login:
 *   post:
 *     summary: Iniciar sessió
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correu:
 *                 type: string
 *               contrasenya:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login correcte amb tokens
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /api/usuari/refresh:
 *   post:
 *     summary: Obtenir nou access token amb refresh token
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nou access token generat
 */
router.post("/refresh", controller.refresh);

/**
 * @swagger
 * /api/usuari/logout:
 *   post:
 *     summary: Tancar sessió
 *     tags: [Usuaris]
 *     responses:
 *       200:
 *         description: Logout correcte
 */
router.post("/logout", controller.logout);

/**
 * @swagger
 * /api/usuari/compres:
 *   get:
 *     summary: Obtenir compres de l'usuari autenticat
 *     tags: [Usuaris]
 *     security:
 *       - BearerAuth: []
 */
router.get('/compres', authMiddleware, controller.obtenirCompresUsuari);

/**
 * @swagger
 * /api/usuari:
 *   get:
 *     summary: Obtenir tots els usuaris
 *     tags: [Usuaris]
 */
router.get('/', controller.obtenirUsuaris);

/**
 * @swagger
 * /api/usuari/{id}:
 *   get:
 *     summary: Obtenir usuari per ID
 *     tags: [Usuaris]
 */
router.get('/:id', controller.obtenirUsuari);

/**
 * @swagger
 * /api/usuari/{id}:
 *   put:
 *     summary: Actualitzar usuari
 *     tags: [Usuaris]
 */
router.put('/:id', controller.actualitzarUsuari);

/**
 * @swagger
 * /api/usuari/{id}:
 *   delete:
 *     summary: Eliminar usuari
 *     tags: [Usuaris]
 */
router.delete('/:id', controller.eliminarUsuari);

module.exports = router;