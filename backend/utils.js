import fs from "fs";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Function to generate a filename for the scraped data
function generateFilename() {
  const date = new Date();
  return `newsData.json`;
}

// Function to save the scraped data as a JSON file
function saveNewsJson(data) {
  const filename = generateFilename();
  fs.writeFileSync(
    path.join(__dirname, "../src/data", filename),
    JSON.stringify(data, null, 2)
  );
}

// Function to generate a title for the scraped data
function generateTitle(title) {
  return title.replace(/\s+/g, "-").toLowerCase();
}

export { generateFilename, saveNewsJson, generateTitle };
