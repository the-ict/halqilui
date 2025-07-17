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

    

    return (
        <div className='flex items-center justify-between p-4 w-full bg-gray-800 text-white'>
            <form action="" className='flex items-center gap-2 w-[40%] bg-gray-700 p-2 rounded'>
                <input type="text" placeholder="Search..." className='flex-1 outline-none border-none'/>
                <button type="submit" className='text-gray-400 hover:text-white cursor-pointer'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            <div className='flex items-center gap-4'>
                <button className='text-gray-400 hover:text-white cursor-pointer bg-gray-700 p-2 rounded' onClick={() => setShowNew(true)}>
                    Ro'yhatdan o'tish
                </button>
                <button className='text-gray-400 hover:text-white cursor-pointer bg-gray-700 p-2 rounded' onClick={() => setShowProfile(true)}>
                    Kirish
                </button>
            </div>
        </div>
    )
}
