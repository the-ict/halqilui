import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"


export default function Profile({ setProfile }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { user } = useSelector(store => store.user)

  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        const res = await axios.put(`/api/user/${user?._id}`, {
          user_id: user._id,
          username,
          password
        }, {
          withCredentials: true
        })

        if(res.data) window.location.reload()
      } else {
        alert("Parolni boshidan kiriting!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen flex items-center justify-center font-inter'>
      <div className='bg-white shadow p-20 rounded flex flex-col items-center slide-up'>
        <div className='flex gap-10 items-center'>
          <h3 className='font-bold text-2xl '>Hisobni o'zgartirish</h3>
          <label htmlFor="profile_pic">
            {
              user.profile_pic ? (
                <img className='w-[50px] h-[50px] cursor-pointer object-contain' src={user.profile_pic} alt="userprofile" />
              ) : (
                <i className="cursor-pointer fa-solid fa-user"></i>
              )
            }
          </label>
          <input type="file" name='profile_pic' id='profile_pic' style={{
            display: "none"
          }} />
        </div>
        <p className='w-full mt-3 font-normal'>Usernameni kiriting:</p>
        <input onChange={(e) => setUsername(e.target.value)} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="username" placeholder={user.username} />
        <p className='w-full mt-3 font-normal'>Parolni kiriting:</p>
        <input onChange={(e) => setPassword(e.target.value)} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="password" plaConfirmceholder="password" />
        <p className='w-full mt-3 font-normal'>Parolni qayta kiriting:</p>
        <input onChange={e => setConfirmPassword(e.target.value)} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="password" placeholder="confirm password" />
        <div className='flex items-center gap-3 mt-3'>
          <button
            onClick={() => setProfile(false)}
            className='border-2 border-[#FF7008] text-[#FF7008] px-3 py-1 cursor-pointer hover:bg-[#FF7008] hover:text-white transition-[2s]'>Bekor qilish</button>
          <button
            onClick={handleSubmit}
            className='border-2 border-[#FF7008] text-[#FF7008] px-3 py-1 cursor-pointer hover:bg-[#FF7008] hover:text-white transition-[2s]'>Saqlash</button>
        </div>
      </div>
    </div>
  )
}
