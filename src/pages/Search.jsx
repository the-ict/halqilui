import React, { useEffect, useRef, useState } from 'react'
import Problem from "../components/Problem"
import Navbar from '../components/Navbar'
import { frameworks } from "../frameworks"
import Newsletter from "../components/Newsletter"
import { useLocation } from "react-router-dom"
import axios from "axios"

export default function Search() {
    const location = useLocation()
    const [language, setLanguage] = useState("Javascript")
    const [searchInput, setSearchInput] = useState(location?.search.split("=")[1])
    const [frame, setFrame] = useState("")
    const [searched, setSearched] = useState([])


    const getSearchedProblems = async () => {
        try {
            // Parse query params
            const params = new URLSearchParams(location.search);
            const search = params.get("search") || "";
            let category = params.get("category");

            // Build query string
            let query = `search=${encodeURIComponent(search)}`;
            if (category) {
                query += `&category=${encodeURIComponent(category)}`;
            }

            console.log(`Searching for: ${search} in categories: ${category}`);
            const res = await axios.get(`http://localhost:5000/api/problem/?${query}`);
            console.log(res.data);
            setSearched(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSearchedProblems()
    }, [])

    const handleFilter = async () => {
        try {
            if (location?.search) {
                const res = await axios.get(`http://localhost:5000/api/problem/?search=${searchInput}&category=${language},${frame}`);
                console.log(res.data, "filter")
                setSearched(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Navbar />
            <div className='px-30 flex max-sm:flex-col font-inter gap-4 mt-10 overflow-visible h-screen max-md:px-2'>
                <div className='flex-1 mt-3 sticky bg-[#111] border-[1px] rounded-lg p-5 top-20 flex h-max flex-col items-center transition justify-between gap-4'>
                    <p className='w-full font-bold max-md:text-[14px]'>Qidirish:</p>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text" placeholder={location?.search.split("=")[1]} className='w-full h-[40px] px-2 py-1 rounded outline-none border-2 border-solid' />
                    <p className='w-full font-bold max-md:text-[14px]'>Tilni tanlang:</p>
                    <select onChange={(e) => {
                        setLanguage(e.target.value)
                    }}

                        className='w-full px-2 py-1 rounded border-2 border-black border-solid max-md:text-[14px]'>
                        {
                            Object.keys(frameworks).map(item => {
                                return (
                                    <option value={item} key={item} selected={searched[0]?.category?.includes(item)}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <p className='w-full font-bold max-md:text-[14px]'>Frameworkni tanlang:</p>

                    <select onChange={(e) => {
                        setFrame(e.target.value)
                    }} id="framework" className='w-full px-2 py-1 max-md:text-[14px] rounded border-2 border-black border-solid'>
                        {
                            frameworks[Object.keys(frameworks).filter(item => item.trim().toLowerCase() === language.trim().toLowerCase())].map(item => (
                                <option value={item} key={item} selected={searched[0]?.category?.includes(item)}>{item}</option>
                            ))
                        }
                    </select>
                    <button
                        onClick={handleFilter}
                        className='px-5 w-full cursor-pointer py-1 bg-red-400 text-white hover:bg-red-500 transition'>Qidirsh</button>
                </div>
                <div className='flex-3'>
                    {
                        searched.length === 0 ? <h3>Natija yo'q</h3> : (
                            searched.map(item => {
                                return (
                                    <Problem info={item} key={item?._id} />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div >
    )
}
