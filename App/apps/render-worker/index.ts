import { Redis } from "ioredis"
import Ffmpeg from "fluent-ffmpeg"
import path from "path"
import fs from "fs"

const redis = new Redis({
    host : "localhost",
    port : 6379
})

async function main(){
    console.log("Render worker started...")
    while(true){
        const test = await redis.brpop("test",0)
        if(!test){
            continue
        }
        const [, value2] = test
        console.log(value2)
        const job = await redis.brpop("render_queue", 0)
        
        if(!job)continue

        const [, value] = job

        const {jobId, projectId, videoPath, susbtitlePath} = JSON.parse(value)

        console.log("Rendering ", {jobId })
    }
}
main()