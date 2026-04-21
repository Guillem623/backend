const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "Documentació de l'API del projecte e-commerce"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],

    components: {
      schemas: {
        security: [
          {
            bearerAuth: []
          }
        ],

        Usuari: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nom: { type: "string" },
            correu: { type: "string" },
            rol: { type: "string", example: "client" }
          }
        },

        Aliment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            nom: { type: "string" },
            descripcio: { type: "string" },
            origen: { type: "string" },
            categoria: { type: "string" },
            preu: { type: "number" }
          }
        },

        CartItem: {
          type: "object",
          properties: {
            nom: { type: "string" },
            preu: { type: "number" }
          }
        },

        Cart: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem"
              }
            },
            total: { type: "number" }
          }
        },

        Compra: {
          type: "object",
          properties: {
            _id: { type: "string" },
            usuari: { type: "string" },
            productes: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CartItem"
              }
            },
            total: { type: "number" }
          }
        }

      },

      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }

  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;