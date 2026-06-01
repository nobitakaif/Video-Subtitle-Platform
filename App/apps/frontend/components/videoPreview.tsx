
export function VideoPreview({ videoUrl }: { videoUrl: string | null }) {
    return (
        <div className=" flex items-center justify-center h-80 w-140">
            <video controls className="max-w-full max-h-full rounded-lg">
                {videoUrl && <source src={videoUrl} type="video/mp4" />}
                Your browser does not support the video tag.
            </video>
        </div>
    );
}