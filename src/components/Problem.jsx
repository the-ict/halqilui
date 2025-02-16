import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Problem({ info }) {
    const [userPic, setUserPic] = useState("")

    useEffect(() => {
        const findUser = async () => {
            try {
                if (info?.author_id) {
                    const res = await axios.get(`/api/user/${info?.author_id}`)
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
            className='w-full bg-indigo-100 rounded px-5 py-3 flex items-center justify-between hover:shadow-2xl transition hover:scale-101 mt-3 mb-3 cursor-pointer'>
            <div className='flex items-center gap-3'>
                {
                    userPic ? (
                        <img className='w-[50px] h-[50px] rounded-full object-cover cursor-pointer' src="https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg" alt="" />
                    ) : (
                        <i className="cursor-pointer fa-solid fa-user"></i>
                    )
                }
                <div>
                    <h3 className='uppercase'>{info?.title}</h3>
                    <p className='w-full overflow-hidden'>{info?.description}</p>
                </div>
            </div>
            <button className='cursor-pointer bg-[#E57676] hover:bg-red-500 transition px-2 py-1 rounded text-white outline-none'>Ko'proq</button>
        </div>
    )
}
