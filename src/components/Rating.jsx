import { Link } from "react-router-dom";

export default function Rating() {
    return (
        <div className="flex-3 sticky max-md:hidden top-0 p-4 max-h-screen h-[calc(100vh-70px)] overflow-y-auto border-l border-white/30 bg-black text-white">
            <h2 className="font-bold text-xl mb-4">Dasturchilar uchun</h2>

            <div className="mt-4 space-y-4">
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
        </div>
    )
}

