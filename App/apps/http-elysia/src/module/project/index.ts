import jwt from "@elysiajs/jwt";
import Elysia, { status } from "elysia";
import { ProjectModel } from "./model";
import { ProjectService } from "./service";

export const project = new Elysia({ prefix : "/project" })
    .use(
        jwt({
            name : "jwt",
            secret : process.env.JWT_SECRET!
        })
    )
    .derive(async({cookie : {auth}, jwt, status, headers}) =>{
         if(!auth?.value){
            return status(401, {
                error : "UNAUTHORIZED"
            })
        }
        // console.log("\n\tauth token ", auth.value)

        const token = headers['authorization']
        if(!token){
            return status(401,{
                msg : "Token not present!"
            })
        }
        console.log('auth headers -> ',token)
        const decodedToken = await jwt.verify(token) // or use token
        console.log("decoded token -> ",decodedToken)
        if(!decodedToken || typeof decodedToken.sub !== "string"){
            return status(403, {
                msg : "invalid token!"
            })
        }
        console.log(decodedToken.sub)
        return {
            userId : decodedToken.sub
        }
    })
    .post("/", async ({userId, body}) =>{
        const { title } = body
        const res = await ProjectService.createProject({ title, userId })
        if('data' in res){
            return status(200,{
                success : res.success,
                data : {
                    id : res.data.id,
                    title : res.data.title,
                    userId : res.data.userId,
                    createdAt : res.data.createdAt
                }   
            })
        }
        return status(400, {
            success : false,
            error : res.error
        })
    },{
        body : ProjectModel.createProjectSchema,
        response : {
            200 : ProjectModel.createProjectSuccess,
            400 : ProjectModel.createProjectFailed
        }
    })
    .get("/", async ({ userId })=>{
        const res = await ProjectService.getAllProject(userId)
        if('data' in res){
            return {
                success : res.success,
                data : res.data.map(pro => ({
                    id : pro.id,
                    title : pro.title,
                    createdAt : pro.createdAt
                }))
            }
        }
        return {
            success : res.success,
            error : res.error
        }
    },{
        response : {
            200 : ProjectModel.getAllProjectSuccess,
            400 : ProjectModel.getAllProjectFailed
        }
    })
    .get("/:projectId", async ({params : { projectId }, userId }) =>{

        const res = await ProjectService.getProjectById(projectId, userId)
        if('data' in res){
            return status(200,{
                success : res.success,
                data : {
                    id : res.data.id,
                    subtitle : res.data.subtitle,
                    title : res.data.title,
                    video : res.data.video
                }
            })
        }
        
        return status(400, {
            success : res.success,
            error : res.error
            
        })
    },{
        response : {
            200 : ProjectModel.getProjectSuccess,
            400 : ProjectModel.getProjectFailed
        }
    })
    .delete("/:projectId", async ({params : { projectId }, userId}) =>{
        const res = await ProjectService.deleteProjectById(projectId, userId)
        if('projectId' in res){
            return status(200, {
                success : res.success,
                projectId : res.projectId
            })
        }
        return status(400,{
            success : res.success,
            error : res.error
        })
    },{
        response : {
            200 : ProjectModel.deleteProjectSuccess,
            400 : ProjectModel.deleteProjectFailed
        }
    })