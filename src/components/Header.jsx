import React from 'react'
import Problem from './Problem'

export default function Header() {
    return (
        <div className='px-30 pt-30 font-inter flex items-center flex-col'>
            <h1 className='text-4xl tracking-widest'>MUAMMOYINGIZGA YECHIM TOPING !</h1>
            <div className='mt-10 rounded-2xl w-[60%] bg-blue-200 py-4 px-5 flex items-center justify-between'>
                <input type="text" placeholder='Look for a solution' className='h-full w-[90%] outline-none border-none' />
                <i className="fa-solid fa-magnifying-glass text-white cursor-pointer"></i>
            </div>
            <h3 className='text-3xl tracking-wide mt-3 mb-3'>Eng ko'p uchraydigan muammolar.</h3>
            <Problem />
            <Problem />
            <Problem />
            <Problem />
            <Problem />
            <Problem />
        </div>
    )
}
