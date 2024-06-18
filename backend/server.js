import express from "express";
import bodyParser from "body-parser";
import scrapeNewsItems from "./scraper.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware for routes
app.use("/news", scrapeNewsItems);

// Server listening
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export server for testing
export default server;
