'use client';

import { useState } from 'react';

export default function TestVideo() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log('Selected file:', file);

    const url = URL.createObjectURL(file);

    console.log('Blob URL:', url);

    setVideoUrl(url);
  };

  return (
    <div className="p-10">
      <input
        type="file"
        accept="video/*"
        onChange={handleChange}
      />

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-[700px] mt-5 border"
        />
      )}
      {JSON.stringify(videoUrl)}
    </div>
  );
}