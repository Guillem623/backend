// 🔹 Endpoint de debug - verifica que tienes rol admin
const debugAdmin = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      message: "✅ Tienes acceso de admin",
      user: {
        id: user.id,
        correu: user.correu,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = debugAdmin;
