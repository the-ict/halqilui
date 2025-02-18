import React from 'react'

export default function Newsletter() {
    return (
        <div className='w-full py-20 flex items-center flex-col justify-center bg-black'>
            <h3 className='text-white text-2xl font-inter tracking-wider'>Taklif uchun</h3>
            <div className='w-[60%] max-sm:w-[90%] mt-10 flex items-center border-2 border-white border-solid pl-2 h-[40px]'>
                <input type="email" placeholder='your message' className='outline-none border-none h-full flex-3 b g-black text-white' />
                <button className='h-full bg-white w-full cursor-pointer flex-1'>Yuborish</button>
            </div>
        </div>
    )
}
