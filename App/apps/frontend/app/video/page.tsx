"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VideoPreview } from "@/components/videoPreview"
import { get } from "idb-keyval"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export default function Page(){

    const [showForm, setShowForm] = useState(true)
    const projectRef = useRef<HTMLInputElement | null>(null)
    const [videoUrl, setVideoUrl ] = useState()
    useEffect(()=>{
        ( async () =>{
            const video = await get("pending-video")
            if(!video){
                toast.error("no video found")
                return 
            }
            setVideoUrl(video)
        })()
    },[])
    
    function createProjectHandle (){
        if(!projectRef.current?.value){
            toast.error("please provide project Name")
            return 
        }
        setShowForm(false)
    }
    
    return <div className=" flex justify-center items-center h-screen w-full">
        
         {
            showForm && 
            <div className=" z-10 absolute h-screen w-full flex justify-center items-center backdrop-blur-sm" 
                onClick={()=>{ 
                    if(!projectRef.current?.value){
                        toast.error("please provide project name")
                        return 
                    }
                    setShowForm(false)}
                }
            >

                <Card className="relative border-black shadow-2xl h-[30%] w-[30%]" onClick={(e) => e.stopPropagation()}>
                    <CardContent className="flex flex-col gap-3">
                        <Input placeholder="project name " type="text" ref={projectRef}/>
                        <Input placeholder="enter room password" type="password"/>
                        <Button className="text-lg font-bold" onClick={createProjectHandle}> Create project </Button>
                    </CardContent>
                </Card>
            </div>
        }
        <div className="h-[70%] w-[70%]">
            <VideoPreview videoUrl={videoUrl ?? ""}/>
        </div>
    </div>
}