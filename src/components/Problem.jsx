import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mediaPath } from "../constants/mediaUrl"

export default function Problem({ info }) {
    const [userPic, setUserPic] = useState("")

    useEffect(() => {
        const findUser = async () => {
            try {
                if (info?.author_id) {
                    const res = await axios.get(`http://localhost:5000/api/user/${info?.author_id}`)
                    setUserPic(res.data.profile_pic)
                }
            } catch (error) {
                console.log(error)
            }
        }
        findUser()
    }, [])
    return (
        <div
            onClick={() => window.location.replace(`/single/${info?._id}`)}
            className='w-full bg-[#333] rounded px-5 py-3 flex items-center justify-between hover:shadow-2xl transition hover:scale-101 mt-3 mb-3 cursor-pointer'>
            <div className='flex items-center gap-3'>
                {
                    userPic ? (
                        userPic.includes("google") ? (
                            <img src={userPic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                        ) : (
                            <img src={mediaPath + "/" + userPic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                        )
                    ) : (
                        <i className="cursor-pointer fa-solid text-[14px] fa-user"></i>
                    )
                }
                <div>
                    <h3 className='uppercase max-2xl:text-[12px] text-[14px] font-bold line-clamp-2'>{info?.title}</h3>
                    <p className='w-full overflow-hidde line-clamp-1 max-2xl:text-[12px]' dangerouslySetInnerHTML={{ __html: info?.description }} />
                </div>
            </div>
            <button className='cursor-pointer bg-[#E57676] hover:bg-red-500 transition px-2 py-1 rounded text-white outline-none'>Ko'proq</button>
        </div>
    )
}
