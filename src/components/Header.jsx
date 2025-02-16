import React, { useEffect, useState } from 'react'
import Problem from './Problem'
import axios from "axios"

export default function Header() {
    const [search, setSearch] = useState("")
    const [problems, setProblems] = useState([])

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await axios.get("/api/problem")
                setProblems(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProblems()
    }, [])

    const searchHandler = (e) => {
        e.preventDefault(); // Sahifa yangilanib ketishining oldini oladi
        if (search.trim()) {
            window.location.replace(`/search/?searched=${search}`)
        }
    }

    return (
        <div className='px-30 pt-30 font-inter flex items-center flex-col min-h-screen'>
            <h1 className='text-4xl tracking-widest'>MUAMMOYINGIZGA YECHIM TOPING !</h1>
            <form onSubmit={(e) => searchHandler(e)}
                className='mt-10 rounded-2xl w-[60%] bg-blue-200 py-4 px-5 flex items-center justify-between'>
                <input onChange={(e) => { setSearch(e.target.value) }} type="text" placeholder='Look for a solution' className='h-full w-[90%] outline-none border-none' />
                <i onClick={searchHandler} className="fa-solid fa-magnifying-glass  cursor-pointer"></i>
            </form>
            <h3 className='text-3xl tracking-wide mt-3 mb-3'>Eng ko'p uchraydigan muammolar.</h3>
            {
                problems.map(problem => {
                    return (
                        <Problem info={problem} key={problem._id} />
                    )
                }
                )
            }
        </div>
    )
}
