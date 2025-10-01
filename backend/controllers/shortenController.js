

import Url from "../models/url.js";
import { nanoid } from "nanoid";

// Controller to handle URL shortening
export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "originalUrl is required" });
    }

    // Check if the URL already exists to prevent duplicate entries
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({
        message: "✅ URL already shortened",
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortId}`,
      });
    }

    // Generate a unique ID for the short URL
    const shortId = nanoid(8);

    // Create and save the new URL document in the database
    const newUrl = await Url.create({ originalUrl, shortId });

    return res.status(201).json({
      message: "✅ Short URL generated",
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortId}`,
    });
  } catch (error) {
    console.error("Error in shortenUrl:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Controller to handle URL redirection
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    // Find the original URL using the short ID
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Return the original URL as JSON for frontend to handle redirect
    return res.status(200).json({ 
      originalUrl: url.originalUrl,
      shortId: url.shortId 
    });
  } catch (error) {
    console.error("Error in redirectUrl:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};