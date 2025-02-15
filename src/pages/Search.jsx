import React, { useRef, useState } from 'react'
import Problem from "../components/Problem"
import Navbar from '../components/Navbar'
import { frameworks } from "../frameworks"
import Newsletter from "../components/Newsletter"
import Profile from '../components/Profile'
import NewPost from '../components/NewPost'

export default function Search() {
    const [language, setLanguage] = useState("Javascript")

    return (
        <div>
            <Navbar />
            <div className='px-30 flex gap-4 mt-10 overflow-visible'>
                <div className='flex-1 mt-3 sticky top-20 flex h-max flex-col items-center transition justify-between gap-4'>
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

                    <select id="framework" className='w-full px-2 py-1 rounded border-2 border-black border-solid'>
                        {
                            frameworks[Object.keys(frameworks).filter(item => item.toLowerCase().trim() === language.toLowerCase().trim()).toString()].map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))
                        }
                    </select>
                    <button className='px-5 w-full cursor-pointer py-1 bg-red-400 text-white'>Qidirsh</button>
                </div>
                <div className='flex-3'>
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                    <Problem />
                </div>
            </div>
            {/* <NewPost /> */}
            <Newsletter />
        </div >
    )
}
