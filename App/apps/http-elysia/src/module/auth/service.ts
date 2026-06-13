import { prisma } from "@repo/db/client";
import { UserModel } from "./model";

export abstract class AuthService {
    static async signup({ name, email, password } : UserModel.SignupSchema) : Promise<UserModel.SignupResponse | UserModel.SignupFaild>{
        try{
            const {id} = await prisma.user.create({
                data : {
                    name, 
                    email, 
                    password : await Bun.password.hash(password , { algorithm : "bcrypt", cost : 8 })
                },
                select : {
                    id : true
                }
            }) 
            if(id){
                return {
                    id,
                    success : true
                }
            }

            return {
                success : false,
                msg : "Signup Failed please try again!"
            }

        }catch(e){
            return {
                success : false,
                msg : e
            }
        }
    }

    static async signin({ email, password, jwt } : UserModel.SigninSchema) : Promise<UserModel.SigninReponse | UserModel.SigninFailed>{
        try{
            const user = await prisma.user.findFirst({
                where : {
                    email
                },
                select : {
                    id : true, 
                    password : true
                }
            })

            if(!user){
                return {
                    msg : "Email not Found!",
                    success : false
                }
            }
            
             const checkPassword = await Bun.password.verify(password, user.password)
                if(!checkPassword){
                    return {
                        success : false,
                        msg : "Incorrect Password"
                    }
                }
                const token = await jwt.sign({sub : user.id})
                
                return {
                    token ,
                    success : true
                }
        }catch(e){
            console.log(e)
            return {
                msg : e,
                success : false
            }
        }
    }
}