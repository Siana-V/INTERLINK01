const express = require("express");
const cors = require("cors");
const { pinoHttp } = require("pino-http");
const pino = require("pino");

// Create logger
const logger = pino();

// Create Express app
const app = express();

// Middleware
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")?.[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Basic API routes
app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

module.exports = app;
