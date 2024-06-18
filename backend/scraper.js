// backend/scraper.js
import cheerio from "cheerio";
import fetch from "node-fetch";
import express from "express";
const router = express.Router();
import { generateFilename, saveNewsJson, generateTitle } from "./utils.js";

const baseUrl = "https://beldefnews.mil.be/volledig-nieuwsoverzicht/";

router.post("/scrape", async (req, res) => {
  // Get the URL from the request body
  // const { url } = req.body;
  // // Validate the URL
  // if (!url || !url.include(baseUrl)) {
  //   console.log("Invalid URL");
  //   return res.status(400).json({ message: "URL" });
  // }

  try {
    // Get the HTML from the URL
    const response = await fetch(baseUrl);
    const body = await response.text();

    // Load the HTML into cheerio
    const $ = cheerio.load(body);
    // Create an empty array to store the products
    const newsItems = [];
    // Loop through each product on the page
    $(".qode-news-item").each((i, el) => {
      const newsItem = $(el);

      const image = newsItem.find(".qode-post-image a img").attr("src");
      const link = newsItem.find(".qode-post-title a").attr("href");
      const title = newsItem.find(".qode-post-title a").text();
      const date = newsItem.find(".qode-post-info-date a").text().trim();

      // If title, date, link, and image are not empty, add to newsItems array
      if (title !== "" && date !== "" && link !== "" && image !== "") {
        newsItems.push({ title, date, link, image });
      }
    });
    // Call the saveProductJson function to save the products array to a JSON file
    saveNewsJson(newsItems);

    // return a success message with the number of products scraped and the filename
    res.json({
      newsItems_saved: newsItems.length,
      message: "News scraped successfully",
      filename: generateFilename(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error scraping products",
      error: error.message,
    });
  }
});

export default router;
