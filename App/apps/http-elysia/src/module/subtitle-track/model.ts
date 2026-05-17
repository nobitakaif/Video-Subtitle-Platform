import { t } from "elysia";

export namespace SubtitleModel{
    export const createSubtitleSchema = t.Object({
        projectId : t.String(),
        language : t.Literal('en')
    })
    export type CreateSubtitleSchema = typeof createSubtitleSchema.static
}