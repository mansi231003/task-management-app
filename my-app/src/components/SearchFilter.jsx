export default function SearchFilter({   search,
    setSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,}){
    return(
        <>
                 <div className="bg-white rounded-xl shadow-lg p-4 w-full flex flex-wrap gap-4">
                        <input type="text" placeholder="Search tasks..."
                            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}
                            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All</option>
                            <option>Todo</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Priority</option>
                            <option>Due Date</option>
                        </select>
                    </div>
        </>
    )
}