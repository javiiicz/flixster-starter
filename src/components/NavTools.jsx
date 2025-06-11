import "../styles/NavTools.css";

const NavTools = ({handleTextChange, handleSearchSubmit, clearSearch, setSortOption}) => {
    return (
        <div className="tools">
            <form className="search-form" onSubmit={handleSearchSubmit} id='search-form'>
                <input type="text" onChange={handleTextChange}></input>
                <button type="submit">Search</button>
                <button onClick={clearSearch}>Clear</button>
            </form>
            <select name="sort-options" defaultValue="" onChange={(e) => {
                setSortOption(e.target.value)
            }}>
                <option value="" disabled hidden>
                    Sort By
                </option>
                <option value="title">Title (alphabetic, A-Z)</option>
                <option value="date">Release date (chronologically, most recent to oldest)</option>
                <option value="average">Vote average (descending, highest to lowest)</option>
            </select>
        </div>
    );
};

export default NavTools;
