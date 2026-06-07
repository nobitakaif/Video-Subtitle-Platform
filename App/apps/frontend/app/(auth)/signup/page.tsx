"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";

export default function Page(){
    return <div className="h-screen w-full bg-[#e2dfdf] flex justify-center items-center">
        <Card className="h-[70%] w-[35%]   shadow-2xl p-4">
            <CardDescription className="h-22 text-5xl text-center p-4 font-bold ">
                Sign Up
            </CardDescription>
            <CardContent>
                <Card className="h-88 p-4 flex flex-col gap-5 justify-start  ">
                    <div className="flex justify-center items-center gap-4">
                        <FcGoogle className="cursor-pointer" size={"30"} onClick={() => alert("login with email")}/>
                        <RxGithubLogo size={30} className="cursor-pointer" onClick={() => alert("login with email")}/>
                    </div>
                    <div>
                        <Label htmlFor="name" className="text-xl font-bold font-serif">Name</Label>
                        <Input type="text" name="name" placeholder="Enter your name" className=""/>
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-xl font-bold font-serif">Email</Label>
                        <Input type="text" name="email" placeholder="Enter your email" className=""/>
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-xl font-bold font-serif">Password</Label>
                        <Input type="password" name="email" placeholder="Enter your password" className=""/>
                    </div>
                    <div>
                        <Button className="w-full text-lg">Sign in</Button>
                    </div>
                </Card>
            </CardContent>
            <CardFooter className="text-center rounded-lg mb-2 w-full flex text-lg items-center justify-center">
                Already have an <p className="underline p-1 cursor-pointer" onClick={() =>
                    redirect("/signin")
                }> account? </p>
            </CardFooter>
        </Card>
    </div>
}