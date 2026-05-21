import { exec } from "child_process"

const cmd = `whisper tmp/848989b9-f6a5-43c8-a29d-fb9fdb5ca944.mp3 --model base --output_format srt --output_dir ./tmp`

exec(cmd, (e, stdout, stderr) =>{
    if(e){
        console.error(e.message)
        return 
    }
    console.log(stdout)
})