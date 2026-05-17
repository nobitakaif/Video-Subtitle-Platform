import Elysia from "elysia";
import { RenderModel } from "./model";
import { RenderService } from "./service";
import { prisma } from "@repo/db/client";


export const renderJob = new Elysia({prefix : "/render"})
    .post("/", async ({ body })=>{
        const { projectId } = body
        const res = await RenderService.createRender({ projectId })

        if(!res){
            return 
        }
        // let count = 1
        // setInterval(async () =>{
            
        //     await prisma.renderJob.update({
        //         where :{
        //             id : res.id
        //         },
        //         data : {
        //             status : count > 2 ? 'FAILED' : 'PROCESSING' 
        //         }
        //     })
        //     count++
        // }, 4000)
        
        return res
    }, {
        body : RenderModel.createRenderSchema
    })
    .get("/:id", async({params : { id }})=>{
        const res = await RenderService.checkJobStatus(id)
        return res
    })