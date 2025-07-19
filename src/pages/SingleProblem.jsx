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

    const user = useSelector(store => store.user.user)

    console.log("single problem user: ", user)


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
                    <div className='flex items-center mt-3 gap-3 flex-wrap h-[500px]'>
                        {/* Image Slider Start */}
                        <ImageSlider images={post?.image} />
                        {/* Image Slider End */}
                    </div>
                    <p
                        className="mt-10 p-5 bg-[#27282D] text-white"
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />

                    {
                        post?.solution && (
                            <div
                                className="mt-10 p-5 bg-[#27282D] text-white"
                            >

                                <h1 className='text-green-500'>Yechim topilgan</h1>

                                <div className='flex items-start gap-3 mt-3 flex-col'>
                                    <div className='flex items-center gap-3'>
                                        <img className='w-[50px] h-[50px] object-cover cursor-pointer rounded-full' src={mediaPath} alt="" />
                                        <p>username</p>
                                    </div>

                                    <p className='text-white'>Yechim: {post?.solution}</p>
                                </div>

                            </div>
                        )
                    }

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
                                    <Comment info={com} key={com?._id} postAuthor={post?.author_id} />
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

    // Slider component (add this inside the same file, above the export default)
    function ImageSlider({ images }) {
        const slides = [
            { color: "#FF6B6B" },
            { color: "#FFD93D" },
            { color: "#6BCB77" },
            { color: "#4D96FF" },
            { color: "#A66CFF" }
        ];
        const [current, setCurrent] = useState(0);

        const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
        const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

        return (
            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-lg">
                <div
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {Array.isArray(images) && images.length > 0 && (
                        images.map((slide, idx) => (
                            <img
                                key={idx}
                                className="w-full h-full object-contain flex-shrink-0 flex items-center justify-center text-3xl font-bold"
                                src={mediaPath + "/" + (images && images[idx])}
                                style={{
                                    background: slide.color,
                                    color: "#fff",
                                    transition: "background 0.5s"
                                }}
                            />
                        ))
                    )}
                </div>
                <button
                    className="absolute top-1/2 left-2 cursor-pointer -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow transition"
                    onClick={prevSlide}
                    aria-label="Previous"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                    className="absolute top-1/2 right-2 cursor-pointer -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow transition"
                    onClick={nextSlide}
                    aria-label="Next"
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {Array.isArray(images) && images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-2 h-2 rounded-full ${current === idx ? 'bg-white' : 'bg-white/50'} transition`}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
