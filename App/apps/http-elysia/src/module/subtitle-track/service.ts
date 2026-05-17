import { prisma } from "@repo/db/client";
import { SubtitleModel } from "./model";


export abstract class SubtitleService{
    static async createSubtitle({ projectId, language } : SubtitleModel.CreateSubtitleSchema){
        try{
            const res = await prisma.subtitleTrack.create({
                data : {
                    projectId, 
                    language
                }
            })
            return {
                success : true,
                data : {
                    id : res.id,
                    projectId : res.projectId,
                    language : res.language,
                    createdAt : res.createdAt
                }
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    }
}