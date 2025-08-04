import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Contents from "../components/Contents";
import Rating from "../components/Rating";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice"
import { useDispatch } from "react-redux";

export default function Home() {

    const state = useSelector((state) => state.user.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const findUserFromGoogle = async () => {
            dispatch(loginStart())
            try {
                const res = await axios.get("http://localhost:5000/google/me", { withCredentials: true })
                console.log(res.data)
                if(!res.data?.username) {
                    dispatch(loginFailure()) 
                    return
                }

                dispatch(loginSuccess(res.data))
            } catch (error) {
                console.log(error)
                dispatch(loginFailure())
            }
        }

        findUserFromGoogle()
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
