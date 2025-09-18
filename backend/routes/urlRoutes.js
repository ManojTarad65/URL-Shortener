

import express from "express";
import { shortenUrl, redirectUrl } from "../controllers/shortenController.js";

const router = express.Router();

// POST - create short url
router.post("/shorten", shortenUrl);

// GET - redirect
router.get("/:shortId", redirectUrl);

export default router;
