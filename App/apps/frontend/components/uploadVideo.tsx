'use client'
import { useRef, useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa";
import { VideoPreview } from "./videoPreview";
import { Upload, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, stagger, slideInRight, scaleIn } from "@/lib/animations";

const Languages = ["English", "Spanish", "French", "Hindi", "Urdu"]

const stats = [
  { value: "40+", label: "Languages" },
  { value: "99.2%", label: "Accuracy" },
  { value: "<2min", label: "Per video hour" },
];

export function UploadVideo() {
    const uploadRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedLang, setSelectedLang] = useState("English");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    function handleFile(selectedFile: File) {
        
        if (!selectedFile.type.startsWith("video/")) {
            alert("Please upload a valid video file.");
            return;
        }

        setFile(selectedFile);
        console.log('this iis file ',selectedFile)
        const url = URL.createObjectURL(selectedFile);
        console.log(url)
        setPreviewUrl(url);
    }

    const onChange = () => {
        const selectedFile = uploadRef.current?.files?.[0]
        if (selectedFile) {
            handleFile(selectedFile)
        }
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]
        const MAX_SIZE = 500 * 1024 * 1024; // 500 MB

        if (droppedFile.size > MAX_SIZE) {
            alert("Video must be smaller than 500 MB");
            return;
        }
        if (droppedFile) {
            handleFile(droppedFile)
        }
        setIsDragOver(false)
    }
    const handleDragOver = (e: any) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: any) => {
        setIsDragOver(false)
        console.log('this is preivew Video ',previewUrl)
    }

    function truncateFileName(name: string, maxLength = 30) {
        if (name.length <= maxLength) return name;

        const extIndex = name.lastIndexOf(".");

        if (extIndex === -1) {
            return name.slice(0, maxLength - 3) + "...";
        }

        const fileName = name.slice(0, extIndex);
        const extension = name.slice(extIndex);

        const start = fileName.slice(0, 18);
        const end = fileName.slice(-6);

        return `${start}...${end}${extension}`;
    }

    return <div className="h-screen w-full flex justify-around items-center">
        
        <motion.div variants={stagger} className="flex flex-col justify-center">
        <motion.span
          variants={fadeUp}
          className="mb-6 inline-block w-fit rounded-full border border-brand-border bg-surface px-3 py-1 text-xs uppercase tracking-widest text-brand-muted"
        >
          AI subtitle studio
        </motion.span>
        <motion.h1 variants={fadeUp} className="font-serif text-[42px] leading-[1.1] font-medium">
          Words that follow<br />your video.
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-relaxed text-brand-muted">
          Upload any video and receive frame-accurate subtitles in minutes. Export to SRT, VTT, or burn directly into your footage.
        </motion.p>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-[14px] border border-brand-border bg-surface p-6"
            >
              <div className="font-serif text-3xl">{s.value}</div>
              <div className="mt-1 text-xs text-brand-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

        <div className={`h-[80%] bg-[#f1eae4] w-[45%] mt-15 rounded-lg relative border border-slate-200 flex justify-center items-center flex-col`} style={{
            opacity: `${isDragOver ? 0.5 : 1} `
        }}
            

        >
            <div className="h-[50%] bg-red-400 w-[90%] flex justify-center items-center flex-col" 
                onClick={() => {
                    if (uploadRef.current) {
                        uploadRef.current?.click()
                    }
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}

                onDragLeave={handleDragLeave}
            >
                <input type="file" hidden accept="video/*" ref={uploadRef} onChange={onChange} />
                <Upload className="size" size={"30px"} />
                <div><h1 className="text-lg ">Drag & drop your file here </h1></div>
            </div>

            // Languages
            <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-brand-muted">Output language</p>
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="show"
            className="mt-3 flex flex-wrap gap-2"
          >
            {Languages.map((l) => (
              <motion.button
                key={l}
                variants={scaleIn}
                onClick={() => setSelectedLang(l)}
                className={`rounded-[10px] border px-3 py-1.5 text-sm transition-colors ${
                  selectedLang === l
                    ? "border-brand-accent bg-brand-accent text-white"
                    : "border-brand-border bg-background text-foreground/80 hover:bg-brand-hover"
                }`}
              >
                {l}
              </motion.button>
            ))}
          </motion.div>
        </div>
            
            {file &&
                <p className="h-10 mt-5 w-80 rounded-lg  text-center p-2 border-3 boder border-green-400">
                    {file && truncateFileName(file.name)}
                </p>
            }
        </div>
    </div>
} 
