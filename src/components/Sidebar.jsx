import React from "react";

export default function Sidebar() {

    const activeColor = "bg-white/30";

    return (
        <div className="sidebar h-[calc(100vh-70px)] flex-2 bg-black text-white p-10 border-r border-white/30 max-h-screen overflow-y-auto">
            <div className="flex items-center gap-5 mb-4 hover:bg-white/10 p-2 rounded cursor-pointer">
                <i className="fa-solid fa-house"></i>
                <span>Lenta</span>
            </div>

            <div>
                <div className="text-gray-500 flex items-center gap-5 mb-4 hover:bg-white/10 p-2 rounded cursor-pointer justify-between">
                    <span>Mavzu</span>
                    <i className="fa-solid fa-arrow-down"></i>
                </div>


                <div className="arrow-down">
                    {
                        [{ item_name: "Dasturlash", item_icon: "fa-solid fa-square-binary" }, { item_name: "Dizayn", item_icon: "fa-solid fa-palette" }, { item_name: "Marketing", item_icon: "fa-solid fa-bullhorn" }, { item_name: "Video Tahrirlash", item_icon: "fa-solid fa-video" }, { item_name: "Oddiy", item_icon: "fa-solid fa-smile" }].map((item, index) => (
                            <div key={index} className="flex items-center gap-5 mb-4 hover:bg-white/10 p-2 rounded cursor-pointer">
                                <i className={item.item_icon}></i>
                                <span>{item.item_name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Add your sidebar items here */}
        </div>
    );
}