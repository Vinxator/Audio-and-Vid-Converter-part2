import YTDlpWrap from "yt-dlp-wrap";
import fs from "fs";
import path from "path";

const ytdlp = new YTDlpWrap();

export async function downloadAudio(url) {
  const filename = `audio_${Date.now()}.mp3`;
  const filepath = path.join("downloads", filename);

  return new Promise((resolve, reject) => {
    ytdlp
      .exec([url, "-x", "--audio-format", "mp3", "-o", filepath])
      .on("close", () => resolve(filepath))
      .on("error", reject);
  });
}

export async function downloadVideo(url) {
  const filename = `video_${Date.now()}.mp4`;
  const filepath = path.join("downloads", filename);

  return new Promise((resolve, reject) => {
    ytdlp
      .exec([url, "-f", "mp4", "-o", filepath])
      .on("close", () => resolve(filepath))
      .on("error", reject);
  });
}
