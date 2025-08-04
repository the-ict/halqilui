import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ConfirmDeleting from './ConfirmDeleting'
import { AiOutlineSolution } from "react-icons/ai";
import { mediaPath } from '../constants/mediaUrl'

export default function Comment({ info, postAuthor }) {
    const [editState, setEditState] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [editInput, setEditInput] = useState(info?.user_message)
    const [author, setAuthor] = useState({})
    const { user } = useSelector(store => store.user)
    const [showMenu, setShowMenu] = useState(false)
    const [confirmSolving, setConfirmSolving] = useState(false)

    const isAdmin = user?._id == info?.user_id

    const commentRef = useRef(null)

    console.log("info:", info)

    useEffect(() => {
        const findUser = async () => {
            try {
                if (info?.user_id) {
                    const res = await axios.get(`http://localhost:5000/api/user/${info?.user_id}`)
                    setAuthor(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        findUser()
    }, [])


    const handleDelete = async (media_id, setConfirm) => {
        try {
            console.log("media_id: ", media_id)
            const res = await axios.delete(`http://localhost:5000/api/comment/${media_id}?user_id=${user._id}`, {
                withCredentials: true
            })
            setConfirm(false)
            if (res.data) {
                window.location.reload()
            }
        } catch (error) {
            setConfirm(false)
            console.log(error)
        }
    }

    const handleEdit = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/comment/${info?._id}`, {
                comment_author: user._id,
                user_message: editInput
            }, {
                withCredentials: true
            })

            if (res.data) window.location.reload()

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/comment/like/${info?._id}/${user?._id}`)
            console.log(res.data)
            if (res.data) window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDislike = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/comment/unlike/${info?._id}/${user?._id}`)
            if (res.data) window.location.reload()
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSetSolve = async () => {
        try {
            console.log("postauthor: ", postAuthor)
            console.log("user: ", user?._id)

            console.log("solution request body: ", {
                problemId: info?.post_id,
                solutionUserId: user?._id,
                problemAuthorId: postAuthor,
                commentId: info?._id
            })

            const res = await axios.put(`http://localhost:5000/api/problem/solution/update`, {
                problemId: info?.post_id,
                solutionUserId: user?._id,
                problemAuthorId: postAuthor,
                commentId: info?._id
            }, {
                withCredentials: true
            })
            if (res.data) window.location.reload()
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex gap-4 items-center justify-between mt-3 relative w-full'>
            {
                author?.username && (
                    <>
                        <div className='flex gap-3 items-center flex-col'>
                            <div className='flex gap-3 items-center flex-1'>
                                {
                                    author?.profile_pic ? (

                                        user?.profile_pic.includes("google") ? (
                                            <img onClick={() => setShowProfile(true)} src={user.profile_pic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                                        ) : (
                                            <img onClick={() => setShowProfile(true)} src={mediaPath + "/" + user?.profile_pic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                                        )
                                    ) : (
                                        <i className="cursor-pointer fa-solid fa-user text-[30px]"></i>
                                    )
                                }
                                <div className='w-full'>
                                    <p ref={commentRef} className='uppercase font-bold cursor-pointer text-[14px]'>{author?.username}</p>
                                    {
                                        !editState ? (
                                            <p className='text-[14px] w-full'>
                                                {info?.user_message}
                                            </p>
                                        ) : (
                                            <input type="text" className={`w-full h-full outline-none border-b-[1px] border-blue-200`} value={editInput} onChange={(e) => { setEditInput(e.target.value) }} />
                                        )
                                    }
                                    <div className='flex items-center gap-4'>
                                        {
                                            info?.likes.includes(user?._id) ? (
                                                <i className="fa-solid fa-thumbs-up"></i>
                                            ) : (
                                                <i onClick={handleLike} className="cursor-pointer fa-regular fa-thumbs-up"></i>
                                            )
                                        }
                                        {
                                            info?.dislikes.includes(user?._id) ? (
                                                <i className="fa-solid fa-thumbs-down"></i>
                                            ) : (
                                                <i onClick={handleDislike} className="cursor-pointer fa-regular fa-thumbs-down"></i>
                                            )
                                        }

                                        {
                                            postAuthor === user?._id && (
                                                info?.solution ? (
                                                    <i className="text-white fa-solid fa-check"></i>
                                                ) : (
                                                    <AiOutlineSolution onClick={() => setConfirmSolving(true)} className='cursor-pointer text-[20px] text-white-500' />
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                        {
                            editState ? (
                                <button className='cursor-pointer px-2 py-1 rounded hover:bg-black transition hover:text-white' onClick={handleEdit} >O'zgartirish</button>
                            ) : (
                                isAdmin && (
                                    <i
                                        onClick={() => setShowMenu(!showMenu)}
                                        className="cursor-pointer text-2xl fa-solid fa-ellipsis-vertical active:bg-gray-100 p-2 rounded-full"></i>
                                )
                            )
                        }
                        {
                            showMenu && (
                                <div className={`absolute right-0 bottom-[-80px] z-20 p-3 rounded bg-black/80 text-white flex flex-col gap-2 shadow-lg`}>
                                    {
                                        isAdmin && (
                                            <>
                                                <div onClick={() => {
                                                    setEditState(true)
                                                    setShowMenu(false)
                                                }} className='px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition flex items-center justify-between gap-3'>
                                                    <span>O'zgartirish</span>
                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                </div>
                                                <div onClick={() => {
                                                    setConfirm(!confirm)
                                                    setShowMenu(false)
                                                }} className='px-2 py-1 rounded hover:bg-gray-700 cursor-pointer transition flex items-center justify-between gap-3'>
                                                    <span>O'chirish</span>
                                                    <i className="fa-solid fa-trash-can-arrow-up"></i>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            confirm && (
                                <ConfirmDeleting info={{
                                    text: "Commentni o'chirib tashlashni hohlaysizmi ?", no: (setMenu) => {
                                        setMenu(false)
                                    },
                                    setConfirm,
                                    media_id: info?._id,
                                    yes: handleDelete
                                }} />
                            )
                        }
                        {
                            confirmSolving && (
                                <ConfirmDeleting info={{
                                    text: "Rostdan ham muammoni yechimi shumi ?", no: (setMenu) => {
                                        setMenu(false)
                                    },
                                    setConfirm: setConfirmSolving,
                                    media_id: info?._id,
                                    yes: handleSetSolve
                                }} />
                            )
                        }
                    </>
                )
            }
        </div >
    )
}
