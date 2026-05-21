import { t } from "elysia";


export namespace UploadModel{
    export const uploadVideoSchema = t.Object({
        title : t.String({minLength : 4, maxLength : 40}),
        videoFile : t.File(),
        userId : t.String(),
        originalUrl : t.String()
    })
    export type UploadVideoSchema = typeof uploadVideoSchema.static
}