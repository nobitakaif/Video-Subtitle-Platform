"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { useRef } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock, Mail } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { RxGithubLogo } from "react-icons/rx";
import { client } from "@/lib/elysiaClient";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";


export default function Page() {

    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {

            const { data, error } = await client.api.v1.auth.signin.post({
                email: email,
                password: password,
            })
            if (error) {  
                const errValue = error.value as { message?: string, msg? : string } | undefined;
                console.log("error -> ",JSON.stringify(error))
                // @ts-ignore
                throw new Error(error.value?.msg || errValue?.message || "Invalid Credentials");
            }
            console.log("data -> ",data)
            window.localStorage.setItem("token", data.token)
            toast.success("signin successful")
            return data;

        },
        onSuccess: () => {
            router.push("/video")
        },
    });

    return <div className="min-h-[calc(var(--vh,1vh)*100)] w-full bg-[#e2dfdf] flex justify-center items-center">
        <Card className="h-[60%] w-[35%]   shadow-2xl p-4">
            <CardDescription className="h-15 text-5xl text-center p-4 font-bold ">
                Sign In
            </CardDescription>
            <CardContent className="flex flex-col gap-5">
                <Card className="p-4 flex flex-col gap-5 justify-start  ">
                    <div className="flex justify-center items-center gap-10 mt-3">
                        <FcGoogle className="cursor-pointer" size={"30"} onClick={() => alert("login with email")} />
                        <RxGithubLogo size={30} className="cursor-pointer" onClick={() => alert("login with email")} />
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            mutation.mutate({
                                email: emailRef.current!.value,
                                password: passwordRef.current!.value,
                            });
                        }}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                                <Input
                                    id="email"
                                    ref={emailRef}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10 h-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                                <Input
                                    id="password"
                                    ref={passwordRef}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="pl-10 h-10"
                                    required
                                />
                            </div>
                        </div>

                        {mutation.isError && (
                            <div className="flex items-start gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-3">
                                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                                <span>
                                    {mutation.error?.message ||
                                        "Something went wrong. Please try again."}
                                </span>
                            </div>
                        )}

                        {mutation.isSuccess && (
                            <div className="flex items-start gap-2.5 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3.5 py-3">
                                <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                                <span>Signed in! Redirecting to dashboard...</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-10 mt-2"
                            disabled={mutation.isPending || mutation.isSuccess}
                        >
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </Card>
            </CardContent>
            <CardFooter className="text-center rounded-lg mb-2 w-full flex text-lg items-center justify-center">
                Don't have an account -  <p className="underline p-1 cursor-pointer" onClick={() =>
                    redirect("/signup")
                }> signup </p>
            </CardFooter>
        </Card>
    </div>
}