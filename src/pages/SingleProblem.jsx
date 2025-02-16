import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Problem from '../components/Problem'
import Comment from '../components/Comment'
import EmojiPicker from "emoji-picker-react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useSelector } from 'react-redux'


export default function SingleProblem() {
    const [post, setPost] = useState({})
    const [username, setUsername] = useState("")
    const [comments, setComments] = useState([])
    const [problems, setProblems] = useState([])
    const [showEmoji, setShowEmoji] = useState(false)
    const [comment, setComment] = useState("")

    const { user } = useSelector(store => store.user)


    const location = useLocation()

    const getComments = async () => {
        try {
            if (location?.pathname) {
                const res = await axios.get(`/api/comment/find/${location?.pathname.split('/')[2]}`)
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
                    const res = await axios.put(`/api/problem/view/${location.pathname.split("/")[2]}`)
                    setPost(res.data)
                    console.log(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        singlePost()

        const findUser = async () => {
            try {
                if (info?.author_id) {
                    const res = await axios.get(`/api/user/${post?.author_id}`)
                    setUsername(res.data.username)
                }
            } catch (error) {
                console.log(error)
            }
        }
        findUser()

        getComments()

        const getProblems = async () => {
            try {
                const res = await axios.post("/api/problem/find", {
                    category: [...post?.category]
                })
                setProblems(res.data)
                console.log("category: ", res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getProblems()

    }, [])

    useEffect(() => {
        getComments()
    }, [comment])


    const handleComment = async () => {
        try {
            const res = await axios.post("/api/comment", {
                post_id: post?._id,
                user_id: user?._id,
                user_message: comment,
            })

            setComment("")

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Navbar />
            <div className='flex mx-30 gap-10 font-inter mt-3 min-h-screen'>
                <div className='p-2 rounded mb-3 h-min[calc(100vh-62px)] flex-3 '>
                    <h3 className='font-bold tracking-wider '>{post.title}</h3>
                    <p><a href="/" className='text-blue-500 underline'>{username}</a> tomonidan <b>{post?.views}</b> martda ko'rilgan</p>
                    <div className='flex items-center mt-3 gap-3 flex-wrap'>
                        {
                            post?.images?.length > 0 && (
                                post?.images.map(image => {
                                    <img className='w-[40%] h-[200px] object-cover cursor-pointer hover:scale-105 transition' src={image} key={image} alt={image} />
                                })
                            )
                        }
                    </div>
                    <p className='text-gray-700 tracking-wider bg-red-200 mt-4 p-2 rounded'>
                        {
                            post.description
                        }
                    </p>
                    <h1 className='mt-3'>Izohlar: {comments.length == 0 && 0}</h1>
                    <div className='flex items-center gap-4 w-full mt-3 h-max'>
                        {
                            user?.profile_pic ? (
                                <img className='w-[50px] h-[50px] object-cover rounded-full cursor-pointer' src="https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg" alt="" />
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
                            <div className='flex justify-between mt-3 relative'>
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
                                    <button className='cursor-pointer hover:bg-black rounded-3xl hover:text-white px-3 py-1 transition outline-none'>Bekor qilish</button>
                                    <button
                                        onClick={handleComment}
                                        className='cursor-pointer hover:bg-blue-800 rounded-3xl hover:text-white px-3 py-1 transition outline-none'>Jo'natish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        {
                            comments.map(comment => {
                                return (
                                    <Comment info={comment} key={comment?._id} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex-2'>
                    <h3 className='font-bold tracking-wide'>Shunga o'xshagan muammolar:{problems.length == 0 && 0}</h3>
                    {
                        problems.map(problem => {
                            return (
                                <Problem info={problem} key={problem?._id} />
                            )
                        })
                    }
                </div>
            </div>
            <Newsletter />
        </div>
    )
}
