import Elysia, { status } from "elysia";
import { VideoModel } from "./model";
import { VideoSerice } from "./service";


export const video = new Elysia({prefix : "/video"})
    .post("/", async({ body })=>{
        const { projectId, originalUrl} = body
        const res = await VideoSerice.createVideo({ projectId, originalUrl })
        console.log(res)
        return status(200,{
          success : res.success 
        })
    },{ 
        body : VideoModel.createVideoSchema
    })