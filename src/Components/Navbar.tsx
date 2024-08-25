const Navbar = () => {
    return (
        <div className="w-56 py-8 px-4 border-r shrink-0 flex flex-col gap-8">
            <p className="text-xl font-semibold">Hi, Username!</p>
            <div className="w-full flex-grow">
                <div className="w-full rounded border border-neutral-600 bg-neutral-800/50 transition-colors hover:bg-neutral-800 p-2">
                    Project Maqsad
                </div>
            </div>
            <div>
                <button className="flex items-center justify-center rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300 w-full">
                    Create new board
                </button>
            </div>
        </div>
    );
}

export default Navbar;