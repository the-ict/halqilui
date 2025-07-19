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
        <div className="sidebar no-scrollbar h-[calc(100vh-70px)] flex-2 bg-black text-white p-6 border-r border-white/20 max-h-screen overflow-y-auto">
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
                        <div className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-house text-xs"></i>
                            <span>Lenta</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-fire text-xs"></i>
                            <span>Trendlar</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-bookmark text-xs"></i>
                            <span>Saqlanganlar</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-user-group text-xs"></i>
                            <span>Jamiyat</span>
                        </div>
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

            {/* Useful Programming Tabs */}
            <div className="mt-8">
                <div
                    className="text-gray-400 uppercase text-xs mb-2 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection("programming")}
                >
                    <span>Dasturchilar uchun</span>
                    <i className={`fa-solid fa-arrow-${openSections.programming ? "up" : "down"} text-xs`}></i>
                </div>
                <Collapse open={openSections.programming}>
                    <div>
                        <Link to="https://github.com/azat-io/you-dont-know-js-ru" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-code text-xs"></i>
                            <span>You Don't Know JS</span>
                        </Link>
                        <Link to="https://www.commandlinefu.com/commands/browse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-terminal text-xs"></i>
                            <span>CLI Commands</span>
                        </Link>
                        <Link to="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-book text-xs"></i>
                            <span>MDN Web Docs</span>
                        </Link>
                        <Link to="https://github.com/leonardomso/33-js-concepts" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-lightbulb text-xs"></i>
                            <span>33 JS concepts every developer should know</span>
                        </Link>
                        <Link to="https://github.com/denysdovhan/wtfjs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 hover:bg-white/10 p-2 rounded cursor-pointer">
                            <i className="fa-solid fa-bug text-xs"></i>
                            <span>JS WTF</span>
                        </Link>
                    </div>
                </Collapse>
            </div>
        </div>
    );
}
