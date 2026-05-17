import jwt from "@elysiajs/jwt";
import Elysia, { status } from "elysia";

export const UserMiddleware = new Elysia()
    .use(
        jwt({
            name : "jwt",
            secret : process.env.JWT_SECRET!
        })
    )
    .derive(async ({ request, jwt}) =>{
        const token = request.headers.get('authorization')
        if(!token){
            // throw new Error("TOKEN NOT PRESENT")
            return{
                d : ""
            }
        }

        const decodedToken = await jwt.verify(token)
        if(!decodedToken || typeof decodedToken.sub !== 'string'){
            return  {
                msg : "INVALID TOKEN!"
            }
        }

        console.log(decodedToken.sub)
        return {
            userId : decodedToken.sub
        }

    })