import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Contents from "../components/Contents";
import Rating from "../components/Rating";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Home() {

    const state = useSelector((state) => state.user.user);
    useEffect(( )=> {
        if(!state || Object.keys(state).length === 0) {
            window.location.href = "/login";
        }
    }, [])
    return (
        <div>
            <Navbar /> 

            <div className="content flex items-start justify-between gap-10 relative">
                <Sidebar />
                <Contents />
                <Rating />
            </div>
        </div>
    )
}
