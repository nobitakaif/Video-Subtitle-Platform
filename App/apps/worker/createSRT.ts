import fs from "fs";

function formatTime(seconds: number) {

  const hrs = Math.floor(seconds / 3600);

  const mins = Math.floor((seconds % 3600) / 60);

  const secs = Math.floor(seconds % 60);

  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function createSRT(
  segments: any[],
  outputPath: string
) {

  let srtContent = "";

  segments.forEach((segment, index) => {

    srtContent += `${index + 1}\n`;

    srtContent += `${formatTime(segment.startTime)} --> ${formatTime(segment.endTime)}\n`;

    srtContent += `${segment.text}\n\n`;

  });

  fs.writeFileSync(outputPath, srtContent);
}