import { t } from "elysia";



export namespace ProjectModel {
    export const createProjectSchema = t.Object({
        title : t.String({minLength : 3, maxLength : 90}),
    })
    export type CreateProjectSchema = typeof createProjectSchema.static

    export const createProjectSuccess = t.Object({
        success : t.Boolean({}),
        data : t.Object({
            id : t.String(),
            title : t.String(),
            userId : t.String(),
            createdAt : t.Date({})
        })
    })
    export type CreateProjectSuccess = typeof createProjectSuccess.static

    export const createProjectFailed = t.Object({
        success : t.Boolean(),
        error : t.Any()
    })
    export type CreateProjectFailed = typeof createProjectFailed.static

    export const getAllProjectSuccess = t.Object({
        success : t.Boolean(),
        data : t.Array(t.Object({
            id : t.String(),
            title : t.String(),
            createdAt : t.Date({format : 'date'})
        }))
    })
    export type GetAllProjectSuccess = typeof getAllProjectSuccess.static

    export const getAllProjectFailed = t.Object({
        success : t.Boolean(),
        error : t.Any()
    })
    export type GetAllProjectFailed = typeof getAllProjectFailed.static

    export const getProjectSuccess = t.Object({
        success : t.Boolean(),
        data : t.Object({
            id : t.String(),
            title : t.String(),
            video : t.Any(),
            subtitle : t.Any(),
        })
    })
    export type GetProjectSuccess = typeof getProjectSuccess.static

    export const getProjectFailed = t.Object({
        success : t.Boolean(),
        error : t.Any()
    })
    export type GetProjectFailed = typeof getProjectFailed.static

    export const deleteProjectSuccess = t.Object({
        success : t.Boolean(),
        projectId : t.String(),
    })
    export type DeleteProjectSuccess = typeof deleteProjectSuccess.static

    export const deleteProjectFailed = t.Object({
        success : t.Boolean(),
        error : t.Any() 
    })
    export type deleteProjectFailed = typeof deleteProjectFailed.static
}