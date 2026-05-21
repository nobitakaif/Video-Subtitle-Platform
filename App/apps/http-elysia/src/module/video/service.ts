import { prisma } from "@repo/db/client";
import { VideoModel } from "./model";


export abstract class VideoSerice{
    static async createVideo({ projectId, originalUrl} : VideoModel.CreateVideoSchema){
        try{
            const res = await prisma.video.create({
                data : {
                    projectId,
                    originalUrl 
                }
            })
            console.log(res)
            
            if(res.id){
                return {
                    success : true,
                }
            }
            return {
                success : false,
            } 
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    }
}