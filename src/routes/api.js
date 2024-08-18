import express from "express";

const router = express.Router();

import { scrape } from "../controllers/scraperController.js";

router.post("/scrape", scrape);

export default router;
