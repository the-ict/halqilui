import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"
import { frameworks } from '../frameworks'

export default function NewPost({ setPost }) {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState([])
    const [desc, setDesc] = useState("")
    const [categories, setCategories] = useState([])
    const { user } = useSelector(store => store.user)


    const handleSubmit = async () => {
        try {
            const newPost = {
                title,
                description: desc,
                author_id: user.user._id
            }

            if (categories.length > 0) {
                newPost.category = categories
                console.log(newPost, "new Post")
            }

            if (file?.name) {
                const data = new FormData()
                const fileName = Date.now() + file?.name
                data.append("name", fileName)
                data.append("file", file)
                const res = await axios.post("http://localhost:5000/api/images", data)
                console.log(res.data)
                newPost.image = fileName
            }
            const res = await axios.post("http://localhost:5000/api/problem", newPost)

            if (res.data) window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div
            className='fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen flex items-center justify-center font-inter'>
            <div className='bg-black/80 text-white border-[2px] shadow p-20 max-sm:p-3 rounded flex flex-col items-center slide-up'>

                <div className='flex gap-10 items-center'>
                    <h3 className='font-bold text-2xl max-sm:text-[12px]'>Muammoni rasm bilan ifodalang!</h3>
                    <label htmlFor="image">
                        {
                            file?.name ? (
                                <img className='w-[50px] h-[50px] object-cover rounded cursor-pointer' src={URL.createObjectURL(file)} alt="file" />
                            ) : (
                                <i className="fa-regular fa-image cursor-pointer text-2xl"></i>
                            )
                        }
                    </label>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file" style={{
                            display: "none"
                        }}
                        name='image' id='image' />

                </div>
                <input onChange={(e) => setTitle(e.target.value)} className='w-full max-sm:w-[calc(100vw-30px)] mt-3 border-2 border-blue-300 px-2 py-1 rounded' type="username" placeholder="Postingizga nom bering!" />
                <textarea onChange={(e) => setDesc(e.target.value)} className='w-full max-sm:w-[calc(100vw-30px)] mt-3 border-2 border-blue-300 p-2 h-50' placeholder='Muammo haqida malumot bering'></textarea>

                <b className='mt-3'>
                    {
                        categories.length > 0 ? (
                            "Frameworkni tanlang !"
                        ) : (
                            "Qaysi til bo'yicha?"
                        )
                    }
                </b>
                <div className='flex gap-4 flex-wrap mt-3 w-[400px] justify-center max-sm:w-[calc(100vw-30px)]'>
                    {
                        categories.length > 0 ? (
                            frameworks[categories[0]].map(item => {
                                console.log(item)
                                return (
                                    <div
                                        key={item}
                                        onClick={() => setCategories(prev => [...prev, item])}
                                        className='text-[13px] bg-gray-500 text-white cursor-pointer w-[100]px flex gap-3 items-center p-1 px-2 rounded'>
                                        {categories.includes(item) ? (
                                            <i className="fa-solid fa-check"></i>
                                        ) : (
                                            <i className="fa-solid fa-plus"></i>
                                        )}
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        ) : (
                            Object.keys(frameworks).map(item => {
                                return (
                                    <div
                                        key={item}
                                        onClick={() => setCategories(prev => [...prev, item])}
                                        className='text-[13px] bg-gray-500 text-white cursor-pointer w-[100]px flex gap-3 items-center p-1 px-2 rounded'>
                                        {categories.includes(item) ? (
                                            <i className="fa-solid fa-check"></i>
                                        ) : (
                                            <i className="fa-solid fa-plus"></i>
                                        )}
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                <div className='flex items-center gap-3 mt-3'>
                    <button
                        onClick={() => setPost(false)}
                        className='cursor-pointer px-3 py-2 bg-red-500 rounded'>Bekor qilish</button>
                    <button
                        onClick={handleSubmit}
                        className='cursor-pointer px-3 py-2 bg-blue-500 rounded'>Yaratish</button>
                </div>
            </div>
        </div>
    )
}
