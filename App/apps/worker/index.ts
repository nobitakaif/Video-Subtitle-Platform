import { Redis } from "ioredis"
import { prisma } from "@repo/db/client"
import { createSRT } from "./createSRT"
import { renderVideo } from "./renderVideo"


const redis = new Redis({
    host : "localhost",
    port : 6379
})

async function startWorker(){
    console.log("worker started.....")

    while(true){
        const job = await redis.brpop("render_queue", 0)

        if(!job)continue

        const [, value] = job

        const { jobId, projectId } = JSON.parse(value)

        console.log("Processing...", jobId)

        await processRender(jobId, projectId)
    }
}
startWorker()

async function processRender(jobId : string, projectId : string){
    try{
        await prisma.renderJob.update({
            where : {
                id : jobId
            },
            data : {
                status : "PROCESSING"
            }
        })

        const project = await prisma.project.findUnique({
            where : {
                id : projectId
            },
            include : {
                video : true,
                subtitleTrack : {
                    include : {
                        segments : true
                    }
                }
            }
        })
        console.log("video :", project)
        if(!project?.video){
            throw new Error("NO video Found!")
        }

        const inputPath = project.video.originalUrl
        const outputPath = `./tmp/${jobId}.mp4`

        console.log("Rendering video....")

        await demoFfmpeg(inputPath, outputPath)

        const outputUrl = `https://cdn.com/${jobId}.mp4`

        const segments = project.subtitleTrack?.segments ||[]
        const subtitlePath = `./temp${jobId}.srt`
        createSRT(segments,subtitlePath)

        const inputVideo = project.video.originalUrl
        const outputVideoPath = `./output/${jobId}.mp4`

        await renderVideo(inputVideo, subtitlePath, outputVideoPath)
        
        await prisma.renderJob.update({
            where : {
                id : jobId
            },
            data : {
                status : "SUCCESS",
                outputUrl
            }
        })
    }catch(e){
        await prisma.renderJob.update({
            where: { 
                id: jobId
            },
            data: {
                status: "FAILED"
            }
        });
    }
}

async function demoFfmpeg(inputPath : string, outputPath : string){
    return new Promise((resolve) =>{
        setTimeout(()=>{
            console.log("Ffmpeg finished")
            resolve(true)
        }, 5000)
    })
}