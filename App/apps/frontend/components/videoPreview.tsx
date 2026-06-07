import { Button } from "./ui/button";

export function VideoPreview({ videoUrl }: { videoUrl: string | null }) {
    return (
        <div className="flex items-center h-full justify-center flex-col">
            {videoUrl && (
                <>
                    <video
                        src={videoUrl}
                        controls
                        className="mt-5 border h-100 rounded-lg "
                        />
                    <Button className="w-full text-lg mt-3 cursor-pointer">Generat Subtitle</Button>
                </>
            )}
            
        </div>
    );
}