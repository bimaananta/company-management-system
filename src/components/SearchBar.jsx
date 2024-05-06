export default function SearchBar({setSearch, handleSearch}){
    return (
        <div className="search-bar w-100 d-flex gap-2 align-items-center">
            <input type="text" name="search" id="search" placeholder="Enter Search" className="form-control" onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-md btn-primary" onClick={handleSearch}><i className="bi bi-search"></i></button>
        </div>
    )
}