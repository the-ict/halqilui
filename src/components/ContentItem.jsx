
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { loginSuccess } from "../redux/userSlice";
import {mediaPath} from "../constants/mediaUrl"

export default function ContentItem({ content }) {
    const [user, setUser] = React.useState(null);
    const [comments, setComments] = React.useState([]);


    const state = useSelector((state) => state.user.user);
    const dispatch = useDispatch()

    console.log(state)
    console.log("content: ", content)
    useEffect(() => {
        const getAuthor = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/${content.author_id}`);
                console.log("Author data:", res.data);
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching author:", error);
            }

        };

        const getComments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/comment/all/${content._id}`);
                setComments(res.data);
                console.log("Comments data:", res.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        getComments();
        getAuthor();
    }, [content.author_id]);
    
    console.log(state)
    const handleBookmark = async () => {
        try {
            const result = await axios.put(
                `http://localhost:5000/api/problem/save/${content._id}/${state.user._id}`
            );
            if (result.data && result.data.user) {
                console.log("Bookmark updated:", result.data.user);
                dispatch(loginSuccess(result.data.user))
            }

        } catch (error) {
            // error handling
        }
    }

    const [currentImage, setCurrentImage] = React.useState(0);

    const handlePrevImage = () => {
        if (!Array.isArray(content.image) || content.image.length === 0) return;
        setCurrentImage((prev) => (prev === 0 ? content.image.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        if (!Array.isArray(content.image) || content.image.length === 0) return;
        setCurrentImage((prev) => (prev === content.image.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full cursor-pointer mt-4">
            <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-4">
                <div className="flex items-center">
                    {
                        user?.profile_pic ? (
                            <img className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="user image" />
                        ) : (
                            <i className="fa-regular fa-user cursor-pointer text-2xl"></i>
                        )
                    }
                    <p className="cursor-pointer hover:underline ml-2">{user?.username}</p>
                </div>

                <div className="flex items-center gap-4">
                    <i onClick={handleBookmark} className={`fa-${state && Array.isArray(state.saved_problems) && state.saved_problems.includes(content._id) ? 'solid' : 'regular'} fa-bookmark cursor-pointer text-2xl hover:text-indigo-600`}></i>
                </div>
            </div>

            <div>
                <p
                    dangerouslySetInnerHTML={{ __html: content.description }}
                    className="text-sm font-bold line-clamp-2" onClick={() => window.location.href = "/single/" + content._id}/>
            </div>

            <div className="content-images flex gap-4 mt-4 h-64 overflow-hidden items-center justify-center relative">
                {Array.isArray(content.image) && content.image.length > 0 && (
                        <img
                            src={mediaPath + "/" + content.image[currentImage]}
                            alt={`content-img-${currentImage}`}
                            className="object-contain h-full max-w-full mx-auto"
                        />
                )}
            </div>

            <div className="flex justify-center items-center mt-4">
                <div className="flex justify-between items-center gap-4">
                    <i onClick={handlePrevImage} className="fa-solid fa-arrow-left cursor-pointer text-2xl"></i>
                    <i onClick={handleNextImage} className="fa-solid fa-arrow-right cursor-pointer text-2xl"></i>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-heart cursor-pointer text-2xl hover:text-indigo-600"></i>
                        <p className="text-sm">{content.recomend} Likes</p>
                    </div>
                    <p className="text-sm">{comments.length} Comments</p>
                </div>
            </div>
        </div>
    )
}