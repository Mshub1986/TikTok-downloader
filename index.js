const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const TikTokScraper = require("btch-downloader");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/tiktok/api.php", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ message: "Missing URL" });

  try {
    const data = await TikTokScraper.tiktok(url);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error processing URL",
      error: err.toString(),
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
