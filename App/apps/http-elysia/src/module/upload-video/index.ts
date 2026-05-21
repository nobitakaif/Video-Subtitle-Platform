import Elysia from "elysia";
import { UploadService } from "./service";
import { UploadModel } from "./model";


export const videoUpload = new Elysia({prefix : "/upload-video"})
    .post("/", async ({ body }) =>{
        const {originalUrl, title, userId, videoFile}  = body
        console.log(originalUrl, title, userId, videoFile)
        const res = await UploadService.videoUpload({title, originalUrl, userId, videoFile})

        
        
        return {
            res
        }
    },  {
        body : UploadModel.uploadVideoSchema
    })