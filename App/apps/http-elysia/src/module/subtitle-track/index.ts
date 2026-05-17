import Elysia from "elysia";
import { SubtitleModel } from "./model";
import { SubtitleService } from "./service";


export const subtitle = new Elysia({prefix : "/subtitle-track"})
    .post("/", async ({ body }) =>{
        const { language, projectId } = body
        const res = await SubtitleService.createSubtitle({projectId, language})

        return res
    },{
        body : SubtitleModel.createSubtitleSchema
    })