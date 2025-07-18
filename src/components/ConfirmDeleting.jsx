import React from 'react'

export default function ConfirmDeleting(props) {
    return (
        <div className='fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50 w-screen h-screen flex items-center justify-center'>
            <div className='bg-black/80 text-white p-5 rounded text-center'>
                <p>{props.info.text}</p>
                <div className='flex items-center gap-4 justify-center mt-3'>
                    <button className='border-2 px-2 py-1 roudned border-amber-600 hover:bg-amber-600 transition cursor-pointer hover:text-white' onClick={() => props.info.no(props.info.setConfirm)}>Yo'q</button>
                    <button className='border-2 px-2 py-1 roudned border-amber-600 hover:bg-amber-600 transition cursor-pointer hover:text-white' onClick={() => props.info.yes(props.info.media_id, props.info.setConfirm)}>Ha</button>
                </div>
            </div>
        </div>
    )
}
