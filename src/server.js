import dotenv from "dotenv";
dotenv.config();

import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Import for ES modules

import { connect } from "./mongo.js"; // Adjust this path if needed
import apiRoutes from "./routes/api.js"; // Adjust this path if needed

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connect();

app.use("/api", apiRoutes);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to client build
const clientBuildPath = path.resolve(__dirname, "../public");

// Serve static files from the React app
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
