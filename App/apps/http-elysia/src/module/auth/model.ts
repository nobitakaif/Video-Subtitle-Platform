import jwt from "@elysiajs/jwt";
import { t } from "elysia";


export namespace UserModel{
    export const signupSchema = t.Object({
        name : t.String({minLength : 4, maxLength : 20}),
        email : t.String({format : "email"}),
        password : t.String({minLength : 8, maxLength : 50})
    })
    export type SignupSchema = typeof signupSchema.static

    export const signupResponse = t.Object({
        id : t.String(),
        success : t.Boolean({default : true})
    })
    export type SignupResponse = typeof signupResponse.static

    export const signupFailed = t.Object({
        success : t.Boolean({default : false}),
        msg : t.Any()
    })
    export type SignupFaild = typeof signupFailed.static

    export const signinSchema = t.Object({
        email : t.String({format : "email"}),
        password : t.String({minLength : 8, maxLength : 50}),
        jwt : t.Optional(t.Any({}))
    })
    export type SigninSchema = typeof signinSchema.static

    export const signinResponse = t.Object({
        token : t.String(),
        success : t.Boolean({default : true})
    })
    export type SigninReponse = typeof signinResponse.static

    export const signinFailed = t.Object({
        success : t.Boolean({default : false}),
        msg : t.Any()
    })
    export type SigninFailed = typeof signinFailed.static
}