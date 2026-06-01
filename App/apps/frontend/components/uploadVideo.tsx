'use client'
import { useRef, useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa";
import { VideoPreview } from "./videoPreview";

export function UploadVideo() {
    const uploadRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    function handleFile(selectedFile: File) {
        // Check MIME type
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
        <VideoPreview videoUrl={previewUrl}/>
        <div className={`h-[80%] bg-[#eee6e6] w-[45%] rounded-lg relative   border-4 border-green-400 flex justify-center items-center flex-col`} style={{
            opacity: `${isDragOver ? 0.5 : 1} `
        }}
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
            <FaArrowAltCircleUp className="size" size={"100px"} />
            <div><h1 className="text-4xl ">Drag & drop your file here </h1></div>
            {file &&
                <p className="h-10 mt-5 w-80 rounded-lg  text-center p-2 border-3 boder border-green-400">
                    {file && truncateFileName(file.name)}
                </p>
            }
        </div>
    </div>
} 

// 'use client'
// import { useRef, useState } from "react"
// import { FaArrowAltCircleUp } from "react-icons/fa";
// import VideoPreview from "./videoPreview";

// export function UploadVideo() {
//     const uploadRef = useRef<HTMLInputElement | null>(null)
//     const [file, setFile] = useState<File | null>(null);
//     const [isDragOver, setIsDragOver] = useState(false)
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//     function handleFile(selectedFile: File) {
//         // Check MIME type
//         if (!selectedFile.type.startsWith("video/")) {
//             alert("Please upload a valid video file.");
//             return;
//         }

//         setFile(selectedFile);

//         const url = URL.createObjectURL(selectedFile);
//         setPreviewUrl(url);
//     }

//     const onChange = () => {
//         const selectedFile = uploadRef.current?.files?.[0]
//         if (selectedFile) {
//             handleFile(selectedFile)
//         }
//     }

//     const handleDrop = (e: any) => {
//         e.preventDefault()
//         const droppedFile = e.dataTransfer.files?.[0]
//         const MAX_SIZE = 500 * 1024 * 1024; // 500 MB

//         if (droppedFile?.size > MAX_SIZE) {
//             alert("Video must be smaller than 500 MB");
//             return;
//         }
//         if (droppedFile) {
//             handleFile(droppedFile)
//         }
//         setIsDragOver(false)
//     }
//     const handleDragOver = (e: any) => {
//         e.preventDefault()
//         setIsDragOver(true)
//     }

//     const handleDragLeave = (e: any) => {
//         setIsDragOver(false)
//     }

//     function truncateFileName(name: string, maxLength = 30) {
//         if (name.length <= maxLength) return name;

//         const extIndex = name.lastIndexOf(".");

//         if (extIndex === -1) {
//             return name.slice(0, maxLength - 3) + "...";
//         }

//         const fileName = name.slice(0, extIndex);
//         const extension = name.slice(extIndex);

//         const start = fileName.slice(0, 18);
//         const end = fileName.slice(-6);

//         return `${start}...${end}${extension}`;
//     }

//     return <div className="h-screen w-full flex justify-around items-center">
//         <div className="">
//             <VideoPreview videoUrl={previewUrl} previewUrl={previewUrl} />
//         </div>
//         <div className={` h-[80%] mt-8 bg-[#eee6e6] w-[45%] rounded-lg  border-4 border-green-400 flex justify-center items-center flex-col`} style={{
//             opacity: `${isDragOver ? 0.5 : 1} `
//         }}
//             onClick={() => {
//                   console.log(uploadRef.current);
//                     uploadRef.current?.click();
//             }}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}

//             onDragLeave={handleDragLeave}

//         >
//             <input type="file" hidden accept="video/*" ref={uploadRef} onChange={onChange} />
//             <FaArrowAltCircleUp className="size" size={"100px"} />
//             <div><h1 className="text-4xl ">Drag & drop your file here </h1></div>
//             {file &&
//                 <p className="h-10 mt-5 w-80 rounded-lg  text-center p-2 border-3 boder border-green-400">
//                     {file && truncateFileName(file.name)}
//                 </p>
//             }
//         </div>
//     </div>
// } 