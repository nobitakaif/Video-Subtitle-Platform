import { prisma } from "@repo/db/client";
import { RenderModel } from "./model";
import Redis from "ioredis";

export const redis = new Redis({
    host : "localhost",
    port : 6379
})

export abstract class RenderService{
    static async createRender({ projectId } : RenderModel.CreateRenderSchema){
        try{
            const res = await prisma.renderJob.create({
                data : {
                    projectId
                }
            })

            const redisRes = await redis.lpush(
                'render_queue',
                JSON.stringify({
                    jobId : res.id,
                    projectId
                })
            )
            console.log(redisRes)
            return {
                id : res.id,
                redisRes
            }
        }catch(e){
            return {
                success : false, 
                error : e,

            }
        }
    }

    static async checkJobStatus(id : string){
        try{
            const res = await prisma.renderJob.findFirst({
                where : {
                    id
                }
            })

            if(!res){
                return {
                    success : false,
                    error : "Incorrect id"
                }
            }
            
            return {
                status : res?.status,
                data : res
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    }
    
}