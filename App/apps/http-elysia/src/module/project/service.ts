import { prisma } from "@repo/db/client";
import { ProjectModel } from "./model";


export abstract class ProjectService {
    static async createProject({ title, userId} : {title : string, userId : string}): Promise<ProjectModel.CreateProjectSuccess | ProjectModel.CreateProjectFailed>{
        
        try{
            const res = await prisma.project.create({
                data : {
                    title,
                    userId
                }
            })
            return {
                success : true,
                data : {
                    id : res.id,
                    title : res.title,
                    createdAt : res.createdAt,
                    userId : res.userId
                }
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    }

    static async getAllProject(userId : string):Promise<ProjectModel.GetAllProjectSuccess | ProjectModel.GetAllProjectFailed>{
        try{    
            const res = await prisma.project.findMany({
                where : {
                    userId : userId
                }
            })
            return {
                success : true,
                data : res.map(pro => ({
                    id : pro.id,
                    title : pro.title,
                    createdAt : pro.createdAt,
                }))
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    }

    static async getProjectById(projectId : string, userId : string ):Promise<ProjectModel.GetProjectSuccess | ProjectModel.GetProjectFailed>{

        try{
            const res = await prisma.project.findFirst({
                where : {
                    id : projectId,
                    userId : userId
                },
                select: {
                    video : true,
                    id : true,
                    title : true,
                    subtitleTrack : true,
                    user : true,
                    renderJobs : true
                }
            })
            console.log("project -> ", res)
            if(!res){
                return {
                    success : false,
                    error : "Project not found, incorrect project"
                }
            }
            return {
                success : true,
                data : {
                    id : res.id,
                    title : res.title,
                    subtitle : res.subtitleTrack,
                    video : res.video
                }
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    } 

    static async deleteProjectById(projectId : string, userId : string):Promise<ProjectModel.DeleteProjectSuccess | ProjectModel.deleteProjectFailed>{

        try{
            const res = await prisma.project.delete({
                where : {
                    id : projectId,
                    userId : userId
                }
            })
            return {
                success : true,
                projectId : res.id
            }
        }catch(e){
            return {
                success : false,
                error : e
            }
        }
    }
}