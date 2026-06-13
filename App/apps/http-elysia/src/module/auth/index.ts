import Elysia, { status } from "elysia";
import { AuthService } from "./service";
import { UserModel } from "./model";
import jwt from "@elysiajs/jwt";


export const UserAuth = new Elysia({prefix : "/auth"})
    .post("/signup", async ({ body }) =>{
        const { name, email, password } = body
        const res = await AuthService.signup({ name, email, password })
        if('id' in res){
            return status(200, {
                id : res.id,
                success : res.success
            })
        }
        return status(400, {
            success : res.success,
            msg : res.msg
        })
    },{
        body : UserModel.signupSchema,
        response : {
            200 : UserModel.signupResponse,
            400 : UserModel.signupFailed
        }
    })
    .use(
        jwt({
            name : 'jwt',
            secret : process.env.JWT_SECRET!
        })
    )
    .post("/signin", async ({ body, jwt, cookie : { auth }})=>{
        const { email , password } = body
        const res = await AuthService.signin({ email, password, jwt })
        if('token' in res){

            // generate token 
            auth.set({
                value : res.token,
                maxAge : 7 * 86400,
                httpOnly : true,
                secure : true
            })
            return status(200, {
                token : res.token,
                success : true
            })
        }
        return status(400, {
            success : res.success,
            msg : res.msg
        })
    }, {
        body : UserModel.signinSchema,
        response : {
            200 : UserModel.signinResponse,
            400 : UserModel.signinFailed
        }
    })