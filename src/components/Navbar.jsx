import React from 'react'

export default function Navbar() {
    return (
        <div className="flex sticky bg-white top-0 items-center w-full h-12 shadow-2xl justify-between px-30 font-kufam">
            <h3 className="text-2xl cursor-pointer">Halqil</h3>
            <div className='flex items-center gap-4'>
                <button className='cursor-pointer py-1 px-2 bg-black rounded text-white'>Ro'yhatdan o'tish</button>
                <button className='cursor-pointer py-1 px-2 bg-black rounded text-white'>Kirish</button>
            </div>
        </div>
    )
}
