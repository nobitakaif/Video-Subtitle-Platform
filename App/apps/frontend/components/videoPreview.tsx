"use client"
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { del, get } from "idb-keyval"

export function VideoPreview({ videoUrl }: { videoUrl: string | null }) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview ] = useState<string |  null>()
    useEffect(() => {
        async function loadVideo() {
            const tempVideo = localStorage.getItem("tempVideo");

            if (!tempVideo) return;

            const file = await get<File>("pending-video");

            console.log("Retrieved file:", file);
            
            const check = await get("pending-video")
            
            if (file) {
                setFile(file);
                const videoUrl = URL.createObjectURL(file)
                setPreview(videoUrl)
                console.log("preview -> ",preview, "videoUrl -> ", videoUrl)
            }
        }
        
        loadVideo();

    }, []);
    return (
        <div className="flex items-center h-full justify-center flex-col">
            {(videoUrl || preview) && (
                <>
                    <video
                        src={videoUrl ? videoUrl : preview!} 
                        controls
                        className="mt-5 border h-100 rounded-lg "
                        />
                    <Button className="w-full text-lg mt-3 cursor-pointer" onClick={() =>{
                        const token = window.localStorage.getItem("token")
                        console.log(token)
                        if(!token) {
                            redirect('/signin')
                        }
                    }}>Generat Subtitle</Button>
                </>
            )}
            
        </div>
    );
}