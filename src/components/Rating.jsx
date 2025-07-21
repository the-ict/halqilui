export default function Rating() {
    return (
        <div className="flex-3 sticky top-0 p-4 max-h-screen h-[calc(100vh-70px)] overflow-y-auto border-l border-white/30 bg-black text-white">
            <h2 className="font-bold text-xl mb-4">Rating</h2>

            <div className="mt-4 space-y-4">
                {
                    [1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between gap-4 p-3 border-b border-gray-600 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out cursor-pointer">
                            <div className="flex items-center gap-3">
                                <img className="w-12 h-12 rounded-full object-cover shadow-lg" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="user avatar" />
                                <p className="text-sm font-medium text-white">Username</p>
                            </div>

                            <span className="text-yellow-400 font-bold text-lg">#{item}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

