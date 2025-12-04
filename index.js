import express from "express";
import cors from "cors";
import { downloadVideo, downloadAudio } from "./downloader.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve website files

app.post("/api/download", async (req, res) => {
  try {
    const { url, format } = req.body;

    if (!url || !format) {
      return res.status(400).json({ error: "Missing URL or format" });
    }

    if (format === "mp3") {
      const filePath = await downloadAudio(url);
      return res.download(filePath);
    }

    if (format === "mp4") {
      const filePath = await downloadVideo(url);
      return res.download(filePath);
    }

    res.status(400).json({ error: "Invalid format" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
