import React from 'react'
import Navbar from './Navbar'

export default function Profile() {
  return (
    <div className='fixed top-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen slide-up flex items-center justify-center font-inter'>
      <div className='bg-white shadow p-20 rounded flex flex-col items-center'>
        <div className='flex gap-10 items-center'>
          <h3 className='font-bold text-2xl '>Hisobni o'zgartirish</h3>
          <img className='w-[50px] h-[50px] cursor-pointer object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s" alt="" />
        </div>
        <input className='w-full mt-3 border-2 border-blue-300 px-2 py-1 rounded' type="username" placeholder="Yangi username kiriting!" />
        <input className='w-full mt-3 border-2 border-blue-300 px-2 py-1 rounded' type="password" placeholder="Yangi parol kiriting" />
        <input className='w-full mt-3 border-2 border-blue-300 px-2 py-1 rounded' type="password" placeholder="Yangi parolni takrorlang!" />
        <div className='flex items-center gap-3 mt-3'>
          <button className='border-2 border-[#FF7008] text-[#FF7008] px-3 py-1 cursor-pointer hover:bg-[#FF7008] hover:text-white transition-[2s]'>Bekor qilish</button>
          <button className='border-2 border-[#FF7008] text-[#FF7008] px-3 py-1 cursor-pointer hover:bg-[#FF7008] hover:text-white transition-[2s]'>Saqlash</button>
        </div>
      </div>
    </div>
  )
}
