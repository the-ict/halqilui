export default function ContentItem() {
    return (
        <div className="w-full cursor-pointer">
            <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-4">
                <div className="flex items-center">
                    <img className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="user image" />
                    <p className="cursor-pointer hover:underline ml-2">Username</p>
                </div>

                <div className="flex items-center gap-4">
                    <i className="fa-regular fa-bookmark cursor-pointer text-2xl hover:text-indigo-600"></i>
                    <i className="fa-solid fa-share-nodes cursor-pointer text-2xl hover:text-indigo-600"></i>
                    <i className="fa-solid fa-ellipsis-vertical cursor-pointer text-2xl hover:text-indigo-600"></i>
                </div>
            </div>

            <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem alias suscipit earum, rerum harum nisi nesciunt corrupti hic sit molestiae, nostrum quam. Sequi quaerat et, minus dolore expedita nulla nemo!</p>
            </div>

            <div className="content-images flex gap-4 mt-4 h-64 overflow-hidden">
                <img className="w-full object-contain bg-black/30 shadow-2xl" src="https://preview.redd.it/the-oligarchs-are-prepared-to-undermine-democracy-spend-v0-dj9y3mw28bdf1.png?width=320&crop=smart&auto=webp&s=8f3ac3de796b5d9b62f9a66d3c3f068914591b70" alt="" />
            </div>
            
            <div className="flex justify-center items-center mt-4">
                <div className="flex justify-between items-center gap-4">
                    <i className="fa-solid fa-arrow-left cursor-pointer text-2xl"></i>
                    <i className="fa-solid fa-arrow-right cursor-pointer text-2xl"></i>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-heart cursor-pointer text-2xl hover:text-indigo-600"></i>
                        <p className="text-sm">100 Likes</p>
                    </div>
                    <p className="text-sm">2 Comments</p>
                </div>
            </div>
        </div>
    )
}