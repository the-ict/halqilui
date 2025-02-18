import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Profile from "../components/Profile"
import NewPost from "../components/NewPost"
import { logout } from "../redux/userSlice"
import { mediaPath } from '../constants/mediaUrl'

export default function Navbar() {
    const [showProfile, setShowProfile] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logout())
        window.location.replace("/login")
    }

    return (
        <div className="flex sticky z-50 bg-white top-0 items-center w-full h-12 shadow-2xl justify-between px-30 font-kufam max-lg:px-2">
            <h3 className="text-2xl cursor-pointer">
                <a href="/">Halqil</a>
            </h3>
            {
                user ? (
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setShowNew(!showNew)}
                            className='px-2 py-1 cursor-pointer hover:bg-black hover:text-white rounded transition'>
                            Yaratish
                        </button>
                        <button className='cursor-pointer' onClick={handleLogOut}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                        {
                            user?.profile_pic ? (
                                <img className='cursor-pointer w-[30px] h-[30px] object-cover rounded-full' src={mediaPath + "/" + user?.profile_pic} alt="user-profile"
                                    onClick={() => setShowProfile(!showProfile)}
                                />
                            ) : (
                                <i className="cursor-pointer fa-solid fa-user"
                                    onClick={() => setShowProfile(!showProfile)}
                                ></i>
                            )
                        }
                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <button className='cursor-pointer py-1 px-2 bg-black rounded text-white'>
                            <a href="/register" className='max-sm:text-[12px]'>Ro'yhatdan o'tish</a>
                        </button>
                        <button className='cursor-pointer py-1 px-2 bg-black rounded text-white'>
                            <a href="/login" className='max-sm:text-[12px]'>Kirish</a>
                        </button>
                    </div>
                )
            }

            {
                showProfile && (<Profile setProfile={setShowProfile} />)
            }

            {
                showNew && (<NewPost setPost={setShowNew} />)
            }
        </div>
    )
}
