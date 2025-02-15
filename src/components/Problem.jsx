import React from 'react'

export default function Problem() {
    return (
        <div className='w-full bg-indigo-100 rounded px-5 py-3 flex items-center justify-between hover:shadow-2xl transition hover:scale-103 mt-3 mb-3 cursor-pointer'>
            <div className='flex items-center gap-3'>
                <img className='w-[50px] h-[50px] rounded-full object-cover cursor-pointer' src="https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg" alt="" />
                <div>
                    <h3 className='uppercase'>React native muammosi</h3>
                    <p className='w-full overflow-hidden'>dasturimni deploy qilganimdan keyin ishlamayapti...</p>
                </div>
            </div>
            <button className='cursor-pointer bg-[#E57676] px-2 py-1 rounded text-white outline-none'>Ko'proq</button>
        </div>
    )
}
