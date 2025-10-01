// import Url from "../models/Url.js";

// export const createShortUrl = async (req, res) => {
//   try {
//     const { originalUrl } = req.body;
//     if (!originalUrl)
//       return res.status(400).json({ error: "originalUrl required" });

//     const shortUrl = Math.random().toString(36).substring(7);

//     const newUrl = new Url({ originalUrl, shortUrl });
//     await newUrl.save();

//     res.json(newUrl);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// controllers/urlController.js
// import Url from "../models/url.js";
// import { nanoid } from "nanoid";
// import shortid from "shortid";


// export const shortenUrl = async (req, res) => {
// console.log("Incomming body", req.body)
//   try {
//     const { originalUrl } = req.body;

//     if (!originalUrl) {
//       return res.status(400).json({ message: "Original URL is required" });
//     }

//     const shortCode = shortid.generate();
//     const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

//     const newUrl = new Url({ originalUrl, shortUrl });
//     await newUrl.save();

//     res.json({ shortUrl });
//   } catch (error) {
//     console.error("❌ Error in shortenUrl:", error); // 👈 log error
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export default shortenUrl;
// import Url from "../models/url.js";
// import { nanoid } from "nanoid";

// export const shortenUrl = async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);

//     const { originalUrl } = req.body;

//     if (!originalUrl) {
//       return res.status(400).json({ message: "originalUrl is required" });
//     }

//     // generate unique nanoid
//     const nanoId = nanoid(8);

//     // create document
//     const newUrl = await Url.create({
//       originalUrl,
//       nanoId, // 👈 save as nanoId instead of shortId
//     });

//     res.json({
//       message: "Generated Short URL",
//       shortUrl: `http://localhost:8000/${nanoId}`,
//     });
//   } catch (err) {
//     console.error("Error in shortenUrl:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// import Url from "../models/url.js";
// import { nanoid } from "nanoid";

// export const shortenUrl = async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body);

//     const { originalUrl } = req.body;
//     if (!originalUrl) {
//       return res.status(400).json({ message: "originalUrl is required" });
//     }

//     const nanoId = nanoid(8);

//     const newUrl = await Url.create({ originalUrl, nanoId });

//     return res.json({
//       message: "✅ Short URL generated",
//       shortUrl: `http://localhost:8000/${nanoId}`,
//     });
//   } catch (error) {
//     console.error("Error in shortenUrl:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// export const redirectUrl = async (req, res) => {
//   try {
//     const { nanoId } = req.params;
//     const url = await Url.findOne({ nanoId });

//     if (!url) {
//       return res.status(404).json({ message: "URL not found" });
//     }

//     return res.redirect(url.originalUrl);
//   } catch (error) {
//     console.error("Error in redirectUrl:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };
// import Url from "../models/url.js";
// import { nanoid } from "nanoid";

// export const shortenUrl = async (req, res) => {
//   try {
//     const { originalUrl } = req.body;
//     if (!originalUrl) {
//       return res.status(400).json({ message: "originalUrl is required" });
//     }

//     const shortId = nanoid(8); // Correct, creates a unique ID

//     const newUrl = await Url.create({ originalUrl, shortId }); // Correctly uses shortId

//     return res.json({
//       message: "✅ Short URL generated",
//       shortUrl: `http://localhost:8000/${shortId}`,
//     });
//   } catch (error) {
//     console.error("Error in shortenUrl:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };
// export const redirectUrl = async (req, res) => {
//   try {
//     const { shortId } = req.params;
//     const url = await Url.findOne({ shortId });

//     if (!url) {
//       return res.status(404).json({ message: "URL not found" });
//     }

//     return res.redirect(url.originalUrl);
//   } catch (error) {
//     console.error("Error in redirectUrl:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

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

    // Redirect the user to the original URL
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error in redirectUrl:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};