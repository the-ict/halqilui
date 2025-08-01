import React, { useState, useRef, useEffect } from "react";
import { frameworks } from "../frameworks";
import { Link } from "react-router-dom";

function Collapse({ open, children }) {
    const ref = useRef(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    useEffect(() => {
        if (open && ref.current) {
            setMaxHeight(ref.current.scrollHeight + "px");
        } else {
            setMaxHeight("0px");
        }
    }, [open, children]);

    return (
        <div
            style={{
                overflow: "hidden",
                transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)",
                maxHeight,
            }}
        >
            <div ref={ref}>{children}</div>
        </div>
    );
}

export default function Sidebar() {
    const [openLanguages, setOpenLanguages] = useState({});
    // Sidebar sections state
    const [openSections, setOpenSections] = useState({
        main: true,
        tools: true,
        programming: true,
    });

    const handleLanguageClick = (language) => {
        setOpenLanguages((prev) => ({
            ...prev,
            [language]: !prev[language],
        }));
    };

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleSearch = (language, frame) => {
        const category = `${language},${frame}`;
        window.location.href = `/search/?category=${category}`;
    }

    return (
        <div className="sidebar max-md:hidden sticky top-0 left-0 no-scrollbar h-screen flex-2 bg-black text-white p-6 border-r border-white/20 max-h-screen overflow-y-auto">
            {/* Main Section */}
            <div className="mt-0">
                <div
                    className="text-gray-400 uppercase text-xs mb-2 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("main")}
                >
                    <span>Asosiy</span>
                    <i className={`fa-solid fa-arrow-${openSections.main ? "up" : "down"} text-xs`}></i>
                </div>
                <Collapse open={openSections.main}>
                    <div>
                        <Link
                            to={"/"}
                            className={`flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer ${
                                window.location.pathname === "/" ? "bg-white/20" : ""
                            }`}
                        >
                            <i className="fa-solid fa-house text-xs"></i>
                            <span>Lenta</span>
                        </Link>
                        <Link
                            to={"/saved"}
                            className={`flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer ${
                                window.location.pathname === "/saved" ? "bg-white/20" : ""
                            }`}
                        >
                            <i className="fa-solid fa-bookmark text-xs"></i>
                            <span>Saqlanganlar</span>
                        </Link>
                    </div>
                </Collapse>
            </div>
            <div>
                <div
                    className="text-gray-400 flex items-center gap-3 mb-2 mt-4 rounded cursor-pointer justify-between"
                    onClick={() => toggleSection("tools")}
                >
                    <span className="uppercase text-xs">Tillar va Frameworklar</span>
                    <i className={`fa-solid fa-arrow-${openSections.tools ? "up" : "down"} text-xs`}></i>
                </div>
                <Collapse open={openSections.tools}>
                    <div>
                        {Object.entries(frameworks).map(([language, libs]) => (
                            <div key={language} className="mb-3">
                                <div
                                    className="text-gray-500 flex items-center gap-3 mb-1 hover:bg-white/10 p-2 rounded cursor-pointer justify-between"
                                    onClick={() => handleLanguageClick(language)}
                                >
                                    <span>{language}</span>
                                    <i className={`fa-solid fa-arrow-${openLanguages[language] ? "up" : "down"} text-xs`}></i>
                                </div>
                                <Collapse open={openLanguages[language]}>
                                    <ul className="pl-4">
                                        {libs.map(lib => (
                                            <li key={lib} className="text-gray-300 hover:text-white cursor-pointer mb-1" onClick={() => handleSearch(language, lib)}>{lib}</li>
                                        ))}
                                    </ul>
                                </Collapse>
                            </div>
                        ))}
                    </div>
                </Collapse>
            </div>

        </div>
    );
}
