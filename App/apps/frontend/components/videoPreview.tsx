
export function VideoPreview({ videoUrl }: { videoUrl: string | null }) {
    return (
        <div className=" flex items-center justify-center h-[50%] w-140 flex-col">
            {videoUrl && (
                <video
                src={videoUrl}
                controls
                className="w-[700px] mt-5 border h-100"
                />
            )}
        </div>
    );
}