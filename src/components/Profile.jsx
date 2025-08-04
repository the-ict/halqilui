import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { mediaPath } from '../constants/mediaUrl'
import { loginSuccess } from '../redux/userSlice'


export default function Profile({ setProfile }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isGoogle, setIsGoogle] = useState(false)
  const [file, setFile] = useState([])
  const [confirmPassword, setConfirmPassword] = useState("")
  const [oldPassword, setOldPassword] = useState("")


  const { user } = useSelector(store => store.user)
  const dispatch = useDispatch()


  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        const updateUser = {
          username: username.length > 0 ? username : user?.username,
          user_id: user.user._id
        }

        if (password.length > 0) {
          updateUser.password = password
        }

        if (file?.name) {
          const fileName = Date.now() + file.name
          const data = new FormData()
          data.append("name", fileName)
          data.append("file", file)

          const res = await axios.post("http://localhost:5000/api/images", data, { withCredentials: true })
          console.log(res.data, "profile response")
          updateUser.profile_pic = fileName
        }

        const res = await axios.put(`http://localhost:5000/api/user/${user.user._id}`, updateUser, {
          withCredentials: true
        })

        if (res.data) {
          dispatch(loginSuccess(res.data))
          window.location.reload()
        }

      } else {
        toast("Parolni boshidan kiriting!")
      }
    } catch (error) {
      toast("No'to'g'ri malumotlar!")
      console.log(error)
    }
  }

  return (
    <div
      className='fixed left-0 z-10 top-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen flex items-center justify-center font-inter'>
      <div className='bg-black/80 text-white border-[2px] rounded shadow p-20 flex flex-col items-center slide-up'>
        <ToastContainer />

        <div className='flex gap-10 items-center'>
          <h3 className='font-bold text-2xl max-sm:text-[14px]'>Hisobni o'zgartirish</h3>
          <label htmlFor="profile_pic">
            {
              file?.name ? (

                <img src={URL.createObjectURL(file)} alt="profile-img" className='w-[50px] h-[50px] cursor-pointer object-cover rounded-full' />


              ) : (

                user?.profile_pic ? (
                  user?.profile_pic.includes("google") ? (
                    <img src={user.profile_pic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                  ) : (
                    <img src={mediaPath + "/" + user?.profile_pic} alt="Profile" className='w-10 h-10 rounded-full cursor-pointer' />
                  )
                ) : < i className="cursor-pointer fa-solid fa-user"></i>
              )
            }
          </label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} name='profile_pic' id='profile_pic' style={{
            display: "none"
          }} />
        </div>
        <p className='w-full mt-3 font-normal' >Usernameni kiriting:</p>
        <input onChange={(e) => setUsername(e.target.value)} placeholder={user.username} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="username" />
        <p className='w-full mt-3 font-normal'>Eski parolni kiriting:</p>
        <input onChange={(e) => setOldPassword(e.target.value)} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="password" placeholder='*****' />
        <p className='w-full mt-3 font-normal'>Parolni kiriting:</p>
        <input onChange={(e) => setPassword(e.target.value)} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="password" placeholder="password" />
        <p className='w-full mt-3 font-normal'>Parolni qayta kiriting:</p>
        <input onChange={e => setConfirmPassword(e.target.value)} className='w-full mt-1 border-2 border-blue-300 px-2 py-1 rounded' type="password" placeholder="confirm password" />
        <div className='flex items-center gap-3 mt-5'>
          <button
            onClick={() => setProfile(false)}
            className='cursor-pointer px-3 py-2 bg-red-500 rounded'>Bekor qilish</button>
          <button
            onClick={handleSubmit}
            className='cursor-pointer px-3 py-2 bg-blue-500 rounded'>O'zgartirish</button>
        </div>
      </div>
    </div >
  )
}
