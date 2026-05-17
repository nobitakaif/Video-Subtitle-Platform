import { t } from "elysia";

export namespace VideoModel{
    export const createVideoSchema = t.Object({
        projectId : t.String(),
        originalUrl : t.String({format : "uri"})
    })
    export type CreateVideoSchema = typeof createVideoSchema.static
    
    export const createVideoSuccess = t.Object({
        success : t.Boolean(),
        id : t.String()
    })
    export type CreateVideoSuccess = typeof createVideoSuccess.static

    export const createVideoFailed = t.Object({
        success : t.Boolean(),
        error : t.Any()
    })
    export type CreateVideoFailed = typeof createVideoFailed.static
}