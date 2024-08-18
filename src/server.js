import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Import for ES modules
import client from "prom-client";

import { connect } from "./mongo.js"; // Adjust this path if needed
import apiRoutes from "./routes/api.js"; // Adjust this path if needed

const app = express();
const PORT = process.env.PORT || 5000;

// Prometheus metrics
const register = new client.Registry();

// Define a new Counter metric
const counter = new client.Counter({
  name: "cosmoscraper_requests_total",
  help: "Total number of requests",
});

// Register the metric
register.registerMetric(counter);

// Middleware to count requests
app.use((req, res, next) => {
  requestCounter.inc({ method: req.method, route: req.path });
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

// Expose metrics endpoint for Prometheus
app.get("/metrics", (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.end(register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
