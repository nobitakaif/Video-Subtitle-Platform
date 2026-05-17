import Elysia from "elysia";
import { SegmentsModel } from "./model";
import { SegmentsService } from "./service";


export const segments = new Elysia({prefix : "/subtitle-segments"})
    .post("/", async ({ body }) =>{
        const {startTime, endTime, trackId, text} = body
        const res = await SegmentsService.createSegment({startTime,endTime, text, trackId})
        return res
    }, {
        body : SegmentsModel.createSegmentsSchema
    })