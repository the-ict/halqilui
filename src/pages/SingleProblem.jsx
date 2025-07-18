import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Problem from '../components/Problem'
import Comment from '../components/Comment'
import EmojiPicker from "emoji-picker-react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useSelector } from 'react-redux'
import { mediaPath } from '../constants/mediaUrl'


export default function SingleProblem() {
    const [post, setPost] = useState({})
    const [username, setUsername] = useState("")
    const [comments, setComments] = useState([])
    const [problems, setProblems] = useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const [comment, setComment] = useState("")
    const [imgWrapper, setImgWrapper] = useState(false)

    const { user } = useSelector(store => store.user)


    const location = useLocation()

    const getComments = async () => {
        try {
            if (location?.pathname) {
                const res = await axios.get(`http://localhost:5000/api/comment/find/${location?.pathname.split('/')[2]}`)
                setComments(res.data.reverse())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const singlePost = async () => {
            try {
                if (location?.pathname) {
                    const res = await axios.put(`http://localhost:5000/api/problem/view/${location.pathname.split("/")[2]}`)
                    setPost(res.data)
                    console.log(res.data, "post")
                }
            } catch (error) {
                console.log(error)
            }
        }
        singlePost()

        getComments()
    }, [])

    useEffect(() => {
        getComments()
    }, [comment])

    useEffect(() => {
        const findUser = async () => {
            try {
                if (post?.author_id) {
                    console.log("bor")
                    const res = await axios.get(`http://localhost:5000/api/user/${post?.author_id}`)
                    console.log("author id: ", res.data)
                    setUsername(res.data.username)
                }
            } catch (error) {
                console.log(error)
            }
        }
        findUser()
        const getProblems = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/problem/?category=${post?.category.toString()}`);
                setProblems(res.data)
            } catch (error) {
                console.log("problems error:", error)
            }
        }
        getProblems()

    }, [post])

    useEffect(() => {
        console.log(post, "post in useEffect")
    }, [post])

    const handleComment = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/comment", {
                post_id: post?._id,
                user_id: user._id,
                user_message: comment,
            })

            setComment("")

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleCancel = async () => {
        setComment("")
    }

    return (
        <div>
            <Navbar />
            <div className='flex max-md:flex-col max-md:gap-0 mx-30 gap-10 font-inter mt-3 min-h-screen max-lg:mx-2'>
                <div className='p-2 rounded mb-3 h-min[calc(100vh-62px)] flex-3 max-md:flex-0 '>
                    <h3 className='font-bold tracking-wider'>{post.title}</h3>
                    <p><a href="/" className='text-blue-500 underline'>{username}</a> tomonidan yaratilgan <b>{post?.views}</b> martda ko'rilgan</p>
                    <div className='flex items-center mt-3 gap-3 flex-wrap'>
                        {
                            post?.image && (
                                <img onClick={() => { setImgWrapper(!imgWrapper) }} className={`w-full h-[500px] object-contain cursor-pointer transition-all ${imgWrapper && "fixed w-screen h-screen bg-black left-0 top-0 z-50"}`} src={mediaPath + "/" + post?.image} alt='image' />
                            )
                        }
                    </div>
                    <p className='text-gray-700 tracking-wider bg-gray-100 mt-4 p-2 rounded'>
                        {
                            post.description
                        }
                    </p>
                    <h1 className='mt-3'>Izohlar: {comments.length == 0 && 0}</h1>
                    <div className='flex items-center gap-3 mt-3'>{
                        post?.category && (
                            post?.category.map(item => {
                                return (
                                    <div
                                        key={item}
                                        className='text-[13px] bg-gray-200 text-black px-3 cursor-pointer w-[100]px flex gap-3 items-center p-1 rounded'>
                                        <i className="fa-solid fa-check"></i>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        )
                    }</div>
                    <div className='flex items-center gap-4 w-full mt-3 h-max'>
                        {
                            user?.profile_pic ? (
                                <img className='w-[50px] h-[50px] object-cover rounded-full cursor-pointer' src={mediaPath + "/" + user?.profile_pic} alt="profile picture" />
                            ) : (
                                <i className="cursor-pointer fa-solid fa-user"></i>
                            )
                        }
                        <div className='w-full'>
                            <input
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }}
                                type="text"
                                placeholder='Fikringiz!'
                                className='w-full h-[30px] outline-none focus:border-b-[1px] transition-all border-b-blue-500' />
                            <div className='flex justify-between mt-3 relative items-center'>
                                <i className="cursor-pointer fa-solid fa-face-smile"
                                    onClick={() => setShowEmoji(!showEmoji)}></i>
                                {
                                    showEmoji && (
                                        <EmojiPicker style={{
                                            position: "absolute",
                                            top: 20,
                                            background: "white",
                                            zIndex: 88,
                                        }}
                                            onEmojiClick={(emojiEvent) => {
                                                setComment(prevComment => prevComment + emojiEvent.emoji)
                                                setShowEmoji(!showEmoji)
                                            }}
                                        />
                                    )
                                }
                                <div className='flex items-center gap-4'>
                                    <button
                                        onClick={handleCancel}
                                        className='cursor-pointer hover:bg-black rounded-3xl hover:text-white px-3 py-1 transition outline-none max-md:text-[12px] max-md:px-0'>Bekor qilish</button>
                                    <button
                                        onClick={handleComment}
                                        className='cursor-pointer hover:bg-blue-800 rounded-3xl hover:text-white px-3 py-1 transition outline-none max-md:text-[12px] max-md:px-0'>Jo'natish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        {
                            comments.map(com => {
                                return (
                                    <Comment info={com} key={com?._id} />
                                )
                            })}
                    </div>
                </div>
                <div className='flex-2 max-md:flex-0'>
                    <h3 className='font-bold tracking-wide text-[12px]'>Shunga o'xshagan muammolar:{problems.length == 0 ? 0 : <b>{problems.length - 1}</b>}</h3>
                    {
                        problems.map(problem => {
                            if (problem._id !== post._id) {
                                return (
                                    <Problem info={problem} key={problem?._id} />
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}
