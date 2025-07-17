import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Contents from "../components/Contents";
import Rating from "../components/Rating";


export default function Home() {
    return (
        <div>
            <Navbar /> 

            <div className="content flex items-start justify-between gap-10">
                <Sidebar />
                <Contents />
                <Rating />
            </div>
        </div>
    )
}
