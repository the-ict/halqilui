import React from 'react'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Problem from '../components/Problem'
import Comment from '../components/Comment'


export default function SingleProblem() {
    return (
        <div>
            <Navbar />
            <div className='flex mx-30 gap-10 font-inter mt-3'>
                <div className='p-2 rounded mb-3 h-min[calc(100vh-62px)] flex-3'>
                    <h3 className='font-bold tracking-wider '>React native muamosi</h3>
                    <p><a href="/" className='text-blue-500 underline'>Javohir</a> tomonidan</p>
                    <div className='flex items-center mt-3 gap-3 flex-wrap'>
                        <img className='w-[40%] h-[200px] object-cover cursor-pointer hover:scale-105 transition' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB8kUzmI7vni85sSRH-uiO6oDh-MVrBD_bCg&s" alt="" />
                        <img className='w-[40%] h-[200px] object-cover cursor-pointer hover:scale-105 transition' src="https://i.ytimg.com/vi/r4TgqWbKRtA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCXPq5LMHf0-UnsOppCkhvW6csBlA" alt="" />
                    </div>
                    <p className='text-gray-700 tracking-wider bg-red-200 mt-4 p-2 rounded'>
                        Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Commodi esse voluptatibus necessitatibus qui quis earum neque sint cupiditate facilis vitae! Unde sit amet corporis aperiam incidunt iure, ex facilis nam?
                    </p>
                    <h1 className='mt-3'>Izohlar:</h1>
                    <div className='flex items-center gap-4 w-full mt-3 h-max'>
                        <img className='w-[50px] h-[50px] object-cover rounded-full cursor-pointer' src="https://static.vecteezy.com/system/resources/thumbnails/007/209/020/small_2x/close-up-shot-of-happy-dark-skinned-afro-american-woman-laughs-positively-being-in-good-mood-dressed-in-black-casual-clothes-isolated-on-grey-background-human-emotions-and-feeligs-concept-photo.jpg" alt="" />
                        <div className='w-full'>
                            <input type="text" placeholder='Fikringiz!' className='w-full h-[30px] outline-none focus:border-b-[1px] transition-all border-b-blue-500' />
                            <div className='flex justify-between mt-3'>
                                <i className="cursor-pointer fa-solid fa-face-smile"></i>
                                <div className='flex items-center gap-4'>
                                    <button className='cursor-pointer hover:bg-black rounded-3xl hover:text-white px-3 py-1 transition outline-none'>Bekor qilish</button>
                                    <button className='cursor-pointer hover:bg-blue-800 rounded-3xl hover:text-white px-3 py-1 transition outline-none'>Jo'natish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                </div>
                <div className='flex-2'>
                    <h3 className='font-bold tracking-wide'>Shunga o'xshagan muammolar.</h3>
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                </div>
            </div>
            <Newsletter />
        </div>
    )
}
