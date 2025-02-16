import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"

export default function NewPost({ setPost }) {
    const [title, setTitle] = useState("")
    const [files, setFiles] = useState([])
    const [desc, setDesc] = useState("")
    const { user } = useSelector(store => store.user)

    useEffect(() => {
        console.log("files: ", files)
    }, [files])


    const handleSubmit = async () => {
        try {
            const res = await axios.post("/api/problem", {
                title,
                description: desc,
                author_id: user._id
            })
            if (res.data) window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className='fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen flex items-center justify-center font-inter'>
            <div className='bg-white shadow p-20 rounded flex flex-col items-center slide-up'>
                <div className='flex gap-10 items-center'>
                    <h3 className='font-bold text-2xl '>Muammoni rasm bilan ifodalang!</h3>
                    <label htmlFor="image">
                        <i className="fa-regular fa-image cursor-pointer text-2xl"></i>
                    </label>
                    <input
                        onChange={(e) => setFiles(e.target.files[0])}
                        type="file" style={{
                            display: "none"
                        }}
                        name='image' id='image' />

                </div>
                <input onChange={(e) => setTitle(e.target.value)} className='w-full mt-3 border-2 border-blue-300 px-2 py-1 rounded' type="username" placeholder="Postingizga nom bering!" />
                <textarea onChange={(e) => setDesc(e.target.value)} className='w-full mt-3 border-2 border-blue-300 p-2 h-50' placeholder='Muammo haqida malumot bering'></textarea>
                <div className='flex items-center gap-3 mt-3'>
                    <button
                        onClick={() => setPost(false)}
                        className='border-2 border-[#FF7008] text-[#FF7008] px-3 py-1 cursor-pointer hover:bg-[#FF7008] hover:text-white transition-[2s]'>Bekor qilish</button>
                    <button
                        onClick={handleSubmit}
                        className='border-2 border-[#FF7008] text-[#FF7008] px-3 py-1 cursor-pointer hover:bg-[#FF7008] hover:text-white transition-[2s]'>Yaratish</button>
                </div>
            </div>
        </div>
    )
}
