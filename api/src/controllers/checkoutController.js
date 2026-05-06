const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Comanda = require("../model/comanda");
const jwt = require("jsonwebtoken");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const crearCheckout = async (req, res) => {

  try {

    // 🔹 Extraer el amount del request body
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Amount inválido"
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Compra Delícies Gourmet"
            },
            unit_amount: amount
          },
          quantity: 1
        }
      ],

      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel"
    });

    res.json({ url: session.url });

  } catch (error) {

    console.error("Error Stripe:", error);

    res.status(500).json({
      error: "Error creant la sessió de pagament"
    });

  }

};

// 🔹 Confirmar la compra después del pago exitoso
const confirmarCompra = async (req, res) => {

  try {

    const { sessionId } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!sessionId) {
      return res.status(400).json({
        error: "Session ID no proporcionado"
      });
    }

    // 🔹 Obtener sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("✅ Sesión de Stripe confirmada:", sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        error: "El pago no ha sido completado"
      });
    }

    // 🔹 Obtener el servicio del carrito
    const cartService = require('../services/cartService');

    // 🔹 Verificar si la comanda ya existe (evitar duplicados)
    let comanda = await Comanda.findOne({ stripeSessionId: sessionId });

    if (!comanda) {
      // 🔹 Obtener el carrito actual para guardar los items
      const cart = await cartService.getCart();

      // 🔹 Crear la comanda en la BD
      comanda = new Comanda({
        usuariId: decoded.id,
        items: cart.items || [],
        total: session.amount_total / 100,
        stripeSessionId: sessionId,
        estat: "confirmat"
      });

      const comandaGuardada = await comanda.save();
      console.log("✅ Comanda guardada en MongoDB:", comandaGuardada._id);

      // 🔹 Limpiar el carrito después de confirmar la compra
      await cartService.checkout(token);
      console.log("✅ Carrito vaciado tras confirmación");
    } else {
      console.log("⚠️  Comanda ya existe para esta sesión:", comanda._id);
    }

    res.json({
      missatge: "Compra confirmada correctament",
      comanda: comanda
    });

  } catch (error) {

    console.error("❌ Error al confirmar compra:", error);

    res.status(500).json({
      error: "Error al confirmar la compra"
    });

  }

};

// 🔹 Obtener todas las compras (solo admin)
const obtenirTotesCompres = async (req, res) => {

  try {

    const compres = await Comanda.find()
      .populate('usuariId', 'nom correu')
      .sort({ createdAt: -1 });
    
    res.json(compres);

  } catch (error) {

    console.error("Error obtenint compres:", error);

    res.status(500).json({
      error: "Error obtenint compres"
    });

  }

};

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️  Error verificando la firma del webhook:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      try {
        const comanda = await Comanda.findOneAndUpdate(
          { stripeSessionId: session.id },
          { estat: 'confirmat' },
          { new: true }
        );

        if (comanda) {
          console.log("✅ Comanda confirmada:", comanda._id);
        } else {
          console.warn("⚠️  No s'ha trobat cap comanda amb aquest sessionId:", session.id);
        }
      } catch (error) {
        console.error("❌ Error actualitzant la comanda:", error);
      }

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = {
  crearCheckout,
  confirmarCompra,
  obtenirTotesCompres,
  webhook
};