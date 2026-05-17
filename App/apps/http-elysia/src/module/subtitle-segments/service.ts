import { prisma } from "@repo/db/client"
import { SegmentsModel } from "./model"

export abstract class SegmentsService{
    static async createSegment({startTime, endTime, text, trackId} : SegmentsModel.CreateSegmentsSchema){
        try{
            const res = await prisma.subtitleSegment.create({
                data : {
                    startTime, 
                    endTime,
                    text,
                    trackId
                }
            })

            return {
                res
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    } 
}