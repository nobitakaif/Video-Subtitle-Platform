import ffmpeg from "fluent-ffmpeg";

export function renderVideo(
  inputVideo: string,
  subtitlePath: string,
  outputPath: string
) {

  const fixedSubtitlePath =
    subtitlePath
      .replace(/\\/g, "/")
      .replace("C:", "C\\\\:");

  const fixedInputVideo =
    inputVideo.replace(/\\/g, "/");

  const fixedOutputPath =
    outputPath.replace(/\\/g, "/");

  return new Promise((resolve, reject) => {

    ffmpeg(fixedInputVideo)

      .videoFilters([
        {
          filter: "subtitles",
          options: fixedSubtitlePath
        }
      ])

      .output(fixedOutputPath)

      .on("start", (cmd) => {

        console.log("FFmpeg command:");
        console.log(cmd);

      })

      .on("end", () => {

        console.log("Render completed");

        resolve(true);

      })

      .on("error", (err) => {

        console.log("FFmpeg Error:");
        console.log(err);

        reject(err);

      })

      .run();

  });
}