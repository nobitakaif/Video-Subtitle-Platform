import Redis from "ioredis";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

console.log("Rendering start");

function resolveSubtitlePath(enqueuedPath: string): string {
  const filename = path.basename(enqueuedPath); 
  const sharedTmp = path.resolve(__dirname, "..", "tmp");
  const corrected = path.join(sharedTmp, filename);

  console.log("📄 Enqueued subtitle path :", enqueuedPath);
  console.log("📄 Resolved subtitle path :", corrected);

  return corrected;
}

async function waitForFile(
  filePath: string,
  retries = 15,
  delayMs = 800
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    if (fs.existsSync(filePath)) return;
    console.log(`wait for the file [${i + 1}/${retries}]: ${filePath}`);
    await new Promise((res) => setTimeout(res, delayMs));
  }
  throw new Error(
    ` file not found ${retries} retries: ${filePath}`
  );
}

async function main() {
  while (true) {
    const job = await redis.brpop("render_queue", 0);
    if (!job) continue;

    const [, value] = job;

    let parsed: { jobId: string; videoPath: string; subtitlePath: string };

    try {
      parsed = JSON.parse(value);
    } catch (e) {
      console.error("failed parsing ", value);
      continue;
    }

    const { jobId, videoPath } = parsed;
    const subtitlePath = resolveSubtitlePath(parsed.subtitlePath);

    console.log("\n──────────────────────────────────────");
    console.log("new job ->", jobId);
    console.log("video -> ", videoPath);
    console.log("subtitle -> ", subtitlePath);
    console.log("──────────────────────────────────────");

    try {
      await waitForFile(videoPath);
      await waitForFile(subtitlePath);

      const outputPath = await render(jobId, videoPath, subtitlePath);
      console.log("job completed successful ", outputPath);
    } catch (err: any) {
      console.error("job failed for", jobId, ":", err.message);
      await redis.lpush(
        "render_failed",
        JSON.stringify({
          jobId,
          videoPath,
          subtitlePath,
          error: err.message,
        })
      );
    }
  }
}

main();

function render(
  jobId: string,
  videoPath: string,
  subtitlePath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
    // out directory
      const outputDir = path.resolve("new-video");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const outputPath = path.join(outputDir, `${jobId}.mp4`);

      const workDir = path.resolve("tmp-safe");
      if (!fs.existsSync(workDir)) {
        fs.mkdirSync(workDir, { recursive: true });
      }

      const safeSrtPath = path.join(workDir, `${jobId}.srt`);
      fs.copyFileSync(subtitlePath, safeSrtPath);

      const videoAbs = path.resolve(videoPath);

      
      const subtitleFF = safeSrtPath
        .replace(/\\/g, "/")
        .replace(/^([A-Za-z]):/, "$1\\:");

      
      const cmd = [
        "ffmpeg",
        "-y",
        `-i "${videoAbs}"`,
        `-vf "subtitles='${subtitleFF}'"`,
        "-c:v libx264",
        "-preset ultrafast",
        "-crf 23",
        "-c:a copy",
        `"${outputPath}"`,
      ].join(" ");

      console.log("\n ffmpg cmd:\n", cmd, "\n");

      exec(cmd, (err, _stdout, stderr) => {
        try {
          fs.unlinkSync(safeSrtPath);
        } catch (_) {}

        if (err) {
          console.error("ffmpge error:\n", stderr || err.message);
          return reject(new Error(stderr || err.message));
        }

        console.log("render complete");
        console.log("output:", outputPath);
        resolve(outputPath);
      });
    } catch (e) {
      reject(e);
    }
  });
}