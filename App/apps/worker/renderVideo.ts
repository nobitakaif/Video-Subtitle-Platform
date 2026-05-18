import ffmpeg from "fluent-ffmpeg";

export function renderVideo(
  inputVideo: string,
  subtitlePath: string,
  outputPath: string
) {

  return new Promise((resolve, reject) => {

    ffmpeg(inputVideo)

      .videoFilters(
        `subtitles=${subtitlePath}`
      )

      .output(outputPath)

      .on("end", () => {

        console.log("Render completed");

        resolve(true);

      })

      .on("error", (err) => {

        console.log(err);

        reject(err);

      })

      .run();

  });
}