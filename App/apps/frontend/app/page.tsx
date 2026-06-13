import { Navbar } from "@/components/Navbar";
import { UploadVideo } from "@/components/uploadVideo";

export default function Home() {

  return (

    <div className="bg-[#f5f3f4] min-h-[calc(var(--vh,1vh)*100)] w-full">
      <Navbar />
      <UploadVideo />

    </div>

  );
}
