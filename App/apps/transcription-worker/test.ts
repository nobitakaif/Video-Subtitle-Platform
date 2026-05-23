import { exec } from "child_process"
import { Redis } from "ioredis"

const cmd = `whisper tmp/848989b9-f6a5-43c8-a29d-fb9fdb5ca944.mp3 --model base --output_format srt --output_dir ./tmp`

// exec(cmd, (e, stdout, stderr) =>{
//     if(e){
//         console.error(e.message)
//         return 
//     }
//     console.log(stdout)
// })

const redis = new Redis({
    host : "localhost",
    port : 6379
})
async function main(){
    await redis.lpush('test', "testing.....")
}

main()