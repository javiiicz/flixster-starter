import "../styles/NavTools.css";

const NavTools = ({handleTextChange, handleSearchSubmit, clearSearch, setSortOption}) => {
    return (
        <div className="tools">
            <form className="search-form" onSubmit={handleSearchSubmit} id='search-form'>
                <input type="text" onChange={handleTextChange}></input>
                <div className="buttons">
                    <button type="submit">Search</button>
                    <button onClick={clearSearch}>Clear</button>
                </div>
            </form>
            <select name="sort-options" defaultValue="" onChange={(e) => {
                setSortOption(e.target.value)
            }}>
                <option value="">
                    Sort By
                </option>
                <option value="title">Title</option>
                <option value="date">Release date</option>
                <option value="average">Vote average</option>
            </select>
        </div>
    );
};

export default NavTools;
