async function download() {
  const url = document.getElementById("url").value;
  const format = document.getElementById("format").value;

  if (!url) {
    alert("Please enter a YouTube URL");
    return;
  }

  const response = await fetch("/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format })
  });

  if (!response.ok) {
    alert("Error downloading file");
    return;
  }

  const blob = await response.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = format === "mp3" ? "audio.mp3" : "video.mp4";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
