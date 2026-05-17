import { t } from "elysia";


export namespace RenderModel{
    export const createRenderSchema = t.Object({
        projectId : t.String()
    })
    export type CreateRenderSchema = typeof createRenderSchema.static
}