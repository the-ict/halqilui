import React from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import ContentItem from "../components/ContentItem"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Contents from "../components/Contents"
import Rating from "../components/Rating"
import { useEffect } from "react"


export default function Saved() {
    const { user } = useSelector(store => store.user)

    const [savedProblems, setSavedProblems] = React.useState([])

    console.log("savedProblems: ", user)

    React.useEffect(() => {
        const fetchSavedProblems = async () => {
            const res = await axios.get(`http://localhost:5000/api/problem/saved/${user._id}`)
            setSavedProblems(res.data)
        }
        if (user) fetchSavedProblems()
    }, [user])

    useEffect(() => {
        console.log("Saved problems:", savedProblems);
    }, [savedProblems]); // Log saved problems whenever they change

    return (
        <div className="saved">
            <Navbar />

            <div className="content flex items-start justify-between gap-10">
                <Sidebar />
                <div className="flex-8 p-4">
                    {
                        savedProblems.map((content) => (
                            <ContentItem key={content._id} content={content} />
                        ))
                    }
                </div>
                <Rating />
            </div>
        </div>
    )
}
