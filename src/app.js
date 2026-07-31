require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const authRoutes = require("./modules/auth/auth.routes");
const tenantRoutes = require("./modules/tenant/tenant.routes");
const transactionRoutes = require("./modules/transaction/transaction.routes");
const roomRoutes = require("./modules/room/room.routes");

const app = express();
const cookieParser = require("cookie-parser");
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
// change the cors to more secure in production
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Boarding House API",
      version: "1.0.0",
      description: "API documentation for the Boarding House app",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/rooms", roomRoutes);

module.exports = app;
