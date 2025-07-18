
export default function Rating() {
    return (
        <div className="flex-3 p-4 max-h-screen h-[calc(100vh-70px)] overflow-y-auto border-l border-white/30">
            <h2 className="font-bold mb-4">Rating</h2>

            <div className="mt-4">
                {
                    [1, 2, 3].map((item) => (
                        <div key={item} className="flex border-b-[1px] border-gray-700 items-center justify-between gap-4 mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer rounded">
                            <div className="flex items-center gap-2">
                                <img className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="user image" />
                                <p>Username</p>
                            </div>

                            <span className="text-yellow-500">#{item}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}