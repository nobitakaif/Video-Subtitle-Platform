import { exec } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import { Redis } from "ioredis";
import path from "path";
import fs from "fs";

const redis = new Redis({
  host: "localhost",
  port: 6379,
});

async function main() {
  console.log("worker started");

  while (true) {
    const job = await redis.brpop("transcription_queue", 0);
    // await redis.lpush('test','response from transcription worker')
    if (!job) continue;

    const [, value] = job;
    const { jobId, projectId, filePath } = JSON.parse(value);

    console.log("processing...", { jobId, projectId, filePath });

    await processor(jobId, projectId, filePath);
  }
}

main()

async function processor(jobId: string, projectId: string, filePath: string) {
  try {
    const tmpDir = path.resolve("tmp");

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    const audioPath = path.resolve(`tmp/${jobId}.mp3`);
    const srtPath = path.resolve(`tmp/${jobId}.srt`);

    console.log(" Extracting audio...");

    await extractAudio(filePath, audioPath);

    console.log(" Running Whisper...");

    const result = await transcribe(audioPath);

    // console.log(" Creating SRT...");

    // createSRT(result.segments, srtPath);

    console.log(" pushing render job... worker 2");
    
    
    
    await redis.lpush(
      "render_queue",
      JSON.stringify({
        jobId,
        projectId,
        videoPath: filePath,
        subtitlePath: srtPath,
      })
    );

    console.log("done...")
    

  } catch (err) {
    console.error(" Worker error:", err);
  }
}

function extractAudio(videoPath: string, audioPath: string) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec("libmp3lame") 
      .audioBitrate("192k")
      .format("mp3")
      .save(audioPath)
      .on("end", resolve)
      .on("error", reject);
  });
}

function transcribe(audioPath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const outputDir = path.resolve("../tmp");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("audioPath", audioPath);

    const cmd = `whisper "${audioPath}" --model base --output_format srt --output_dir "${outputDir}"`;

    exec(cmd, (e, stdout, stderr) => {
      if (e) {
        console.error("Whisper error:", e.message);
        return reject(e);
      }

      if (stderr) {
        console.log("Whisper logs:", stderr);
      }

      const baseName = path.parse(audioPath).name;
      const srtPath = path.join(outputDir, `${baseName}.srt`);

      if (!fs.existsSync(srtPath)) {
        return reject(new Error("SRT file not found after whisper"));
      }

      const srtContent = fs.readFileSync(srtPath, "utf-8");

      resolve({
        srtPath,
        srtContent,
      });
    });
  });
}

// transcribe('tmp/848989b9-f6a5-43c8-a29d-fb9fdb5ca944.mp3')

function formatTime(seconds: number) {
  const date = new Date(seconds * 1000);
  return date.toISOString().substr(11, 8) + ",000";
}


function createSRT(segments: any[], outputPath: string) {
  let srt = "";

  segments.forEach((seg, i) => {
    srt += `${i + 1}\n`;
    srt += `${formatTime(seg.start)} --> ${formatTime(seg.end)}\n`;
    srt += `${seg.text}\n\n`;
  });

  fs.writeFileSync(outputPath, srt);
}