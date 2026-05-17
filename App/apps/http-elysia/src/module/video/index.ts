import Elysia, { status } from "elysia";
import { VideoModel } from "./model";
import { VideoSerice } from "./service";


export const video = new Elysia({prefix : "/video"})
    .post("/", async({ body })=>{
        const { projectId, originalUrl} = body
        const res = VideoSerice.createVideo({ projectId, originalUrl })
        return status(200,{
          success : true  
        })
    },{ 
        body : VideoModel.createVideoSchema
    })