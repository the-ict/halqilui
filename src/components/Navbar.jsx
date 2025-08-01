import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Profile from "../components/Profile"
import NewPost from "../components/NewPost"
import { logout } from "../redux/userSlice"
import { mediaPath } from '../constants/mediaUrl'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {
    const [showProfile, setShowProfile] = useState(false)
    const [search, setSearch] = useState("")
    const [showNew, setShowNew] = useState(false)
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const handleNavigate = (e) => {
        e.preventDefault();
        if (search) {
            window.location.href = `/search/?search=${search}`;
        } else {
            window.location.href = '/';
        }
    }


    const handleLogout = async () => {
        try {
            const result = await axios.get("http://localhost:5000/api/auth/logout")
            if (result.data) {
                dispatch(logout())
                window.location.href = "/login"
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex items-center justify-between p-4 w-full bg-black text-white'>
            <Link to="/" className='pl-5'>
                <h1>Halqil</h1>
            </Link>

            <form onSubmit={(e) => handleNavigate(e)} action="" className='flex items-center gap-2 w-[40%] bg-white/10 p-2 rounded'>
                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search..." className='flex-1 outline-none border-none' />
                <button onClick={(e) => handleNavigate(e)} type="submit" className='text-gray-400 hover:text-white cursor-pointer'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>

            {
                showProfile && <Profile setProfile={setShowProfile} />
            }
            {
                showNew && <NewPost setPost={setShowNew} />
            }


            <div className='flex items-center gap-4'>
                {
                    user ? (
                        <>
                            <Link to={`/`}>
                                {
                                    user.profile_pic ? (
                                        user.profile_pic.includes("google") ? (
                                            <img onClick={() => setShowProfile(true)} src={user.profile_pic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                                        ) : (
                                            <img onClick={() => setShowProfile(true)} src={mediaPath + "/" + user.profile_pic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                                        )
                                    ) : (
                                        <i onClick={() => setShowProfile(true)} className="fa-solid fa-user text-[20px] cursor-pointer"></i>
                                    )
                                }
                            </Link>
                            <button onClick={() => setShowNew(true)} className='text-gray-400 hover:text-white cursor-pointer'>
                                <i className="fa-solid fa-plus text-[20px]"></i>
                            </button>
                            <button onClick={handleLogout} className='text-gray-400 hover:text-white cursor-pointer'>
                                <i className="fa-solid fa-right-from-bracket text-[20px]"></i>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className='text-gray-400 hover:text-white cursor-pointer'>
                                <button className='text-gray-400 hover:text-white cursor-pointer bg-gray-900 p-2 rounded' onClick={() => setShowNew(true)}>
                                    Ro'yhatdan o'tish
                                </button>
                            </Link>
                            <Link to="/login" className='text-gray-400 hover:text-white cursor-pointer'>
                                <button className='text-gray-400 hover:text-white cursor-pointer bg-gray-900 p-2 rounded' onClick={() => setShowNew(true)}>
                                    Kirish
                                </button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}
