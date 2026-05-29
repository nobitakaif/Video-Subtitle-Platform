'use client'
import { useRef, useState } from "react"

export function UploadVideo(){
    const uploadRef = useRef(null)
    const [file, setFile] = useState()
    const [isDragOver, setIsDragOver] = useState(false)
    const onChange = (e:any) =>{
        if(uploadRef.current){
            console.log(uploadRef.current.files[0])
            setFile(uploadRef.current.files[0])
        }
        
    }
    const handleDrop = (e:any)=>{
        e.preventDefault()
        console.log(e.dataTransfer.files[0])
        setFile(e.dataTransfer.files[0])
        
    }
    const handleDragOver = (e : any) =>{
        e.preventDefault()
        setIsDragOver(true)
        
    } 
    return <div className={`h-[80%] bg-red-300 w-[45%] rounded-lg relative top-[15%] left-[50%] `} style={{
        opacity : `${isDragOver ? 0.5 : 1}`
    }}
        onClick={()=>{
            if(uploadRef.current){
                uploadRef.current.click()
            }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={()=>{
            setIsDragOver(false)
        }}

    >
        <input type="file" hidden accept="video/*" ref={uploadRef} onChange={onChange}/>
        <p>{file && file.name}</p>
    </div>
} 