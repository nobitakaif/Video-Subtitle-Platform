import { Index } from "@/components/landingPage";
import { Navbar } from "@/components/Navbar";
import { UploadVideo } from "@/components/uploadVideo";

export default function Home() {
  return (
    <div className="bg-[#f5f3f4] h-screen w-full">
      <Navbar/>
      <UploadVideo/>
      
    </div> 
  );
}
