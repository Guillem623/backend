const express = require("express");
const router = express.Router();
const controller = require("../controllers/checkoutController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, controller.crearCheckout);
router.post("/confirm", authMiddleware, controller.confirmarCompra);

// 🔹 Debug endpoint - verifica que tienes rol admin
router.get("/debug/admin", authMiddleware, (req, res) => {
  res.json({
    message: "✅ Tienes acceso con autenticación",
    user: req.user,
    rol: req.user?.rol
  });
});

// 🔹 Obtener todas las compras (solo admin)
router.get("/totes", authMiddleware, roleMiddleware("admin"), controller.obtenirTotesCompres);
// 🔹 Webhook sense autenticació i amb raw body configurada en index.js
router.post("/webhook", controller.webhook);

module.exports = router;