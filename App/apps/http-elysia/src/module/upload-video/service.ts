import { prisma } from "@repo/db/client";
import { UploadModel } from "./model";
import path from  "path"
import Redis from "ioredis";


export const redis = new Redis({
    host : "localhost",
    port : 6379
})

export abstract class UploadService{
    static async videoUpload( { title, videoFile, userId, originalUrl } : UploadModel.UploadVideoSchema){
        const {project, video, job} = await prisma.$transaction( async(txn) =>{
            const project = await txn.project.create({
                data : {
                    title,
                    userId 
                }
            })
            if(!project.id){
                throw new Error("Failed to create Project!")
            }

            const video = await txn.video.create({
                data : {
                    projectId : project.id,
                    originalUrl,
                }
            })

            if(!video.id){
                throw new Error("Failed to create a Video")
            }

            const job = await txn.renderJob.create({
                data : {
                    projectId : project.id,
                    status : "QUEUED"
                }
            }) 
            return {
                project,
                video, 
                job
            }
        })

        const videoPath = `${project.id}.mp4`

        const filePath = path.resolve(`../storage/${videoPath}`)

        const file = await Bun.write(filePath, videoFile)
        console.log(file)

        const redisRes = await redis.lpush('transcription_queue', JSON.stringify({
            jobId : job.id,
            projectId : project.id, 
            filePath : filePath
        }))
        
        return {
            success : true
        }
    }
}