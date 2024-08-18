import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Import for ES modules

import promClient from "prom-client";
import { collectDefaultMetrics } from "prom-client";

import { connect } from "./mongo.js"; // Adjust this path if needed
import apiRoutes from "./routes/api.js"; // Adjust this path if needed

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Create a new Counter metric
const requestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route"],
});

// Collect default metrics (optional)
collectDefaultMetrics();

// Middleware to increment the request counter
app.use((req, res, next) => {
  requestCounter.inc({ method: req.method, route: req.path });
  next();
});

// Endpoint to expose metrics to Prometheus
app.get("/metrics", (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.send(promClient.register.metrics());
});

connect();

app.use("/api", apiRoutes);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to client build
const clientBuildPath = path.resolve(__dirname, "../client/build");

// Serve static files from the React app
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
