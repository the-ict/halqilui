import React, { useEffect } from "react"
import ContentItem from "./ContentItem"
import axios from "axios";


export default function Contents() {
    const [contents, setContents] = React.useState([]);

    useEffect(() => {
        const getContents = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/problem");
                if (res.data) {
                    console.log(res.data, "from contents");
                    setContents(res.data);
                }
            } catch (error) {
                console.error("Error fetching contents:", error);
            }
        };
        getContents();
    }, []);
    return (
        <div className="flex-8 p-4">
            {
                contents.map((content) => (
                    <ContentItem key={content._id} content={content} />
                ))
            }
        </div>
    )
}