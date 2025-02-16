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
    const [frame, setFrame] = useState("React")
    const [searched, setSearched] = useState([])


    const getSearchedProblems = async () => {
        try {
            if (location?.search) {
                const res = await axios.get(`/api/problem/?search=${location.search.split("=")[1]}`)
                console.log(res.data)
                setSearched(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSearchedProblems()
    }, [])

    const handleFilter = async () => {
        try {
            if (location?.search) {
                const res = await axios.get(`/api/problem/?search=${searchInput}&category=${language},${frame}`);
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
            <div className='px-30 flex font-inter gap-4 mt-10 overflow-visible h-screen'>
                <div className='flex-1 mt-3 sticky top-20 flex h-max flex-col items-center transition justify-between gap-4'>
                    <p className='w-full font-bold'>Qidirish:</p>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text" placeholder={location?.search.split("=")[1]} className='w-full h-[40px] px-2 py-1 rounded outline-none border-2 border-solid' />
                    <p className='w-full font-bold'>Tilni tanlang:</p>
                    <select onChange={(e) => {
                        setLanguage(e.target.value)
                    }} className='w-full px-2 py-1 rounded border-2 border-black border-solid'>
                        <option value="Javascript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="PHP">PHP</option>
                        <option value="Swift">Swift</option>
                        <option value="Go">Go</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="Rust">Rust</option>
                        <option value="Ruby">Ruby</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Dart">Dart</option>
                        <option value="Scala">Scala</option>
                        <option value="Perl">Perl</option>
                        <option value="Lua">Lua</option>
                        <option value="Haskell">Haskell</option>
                        <option value="Objective-C">Objective-C</option>
                    </select>
                    <p className='w-full font-bold'>Frameworkni tanlang:</p>

                    <select onChange={(e) => {
                        setFrame(e.target.value)
                    }} id="framework" className='w-full px-2 py-1 rounded border-2 border-black border-solid'>
                        {
                            frameworks[Object.keys(frameworks).filter(item => item.toLowerCase().trim() === language.toLowerCase().trim()).toString()].map(item => (
                                <option value={item} key={item}>{item}</option>
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
            {/* <NewPost /> */}
            <Newsletter />
        </div >
    )
}
