import "../styles/NavTools.css";

const NavTools = ({handleTextChange, handleSearchSubmit, clearSearch}) => {
    return (
        <div className="tools">
            <form className="search-form" onSubmit={handleSearchSubmit} id='search-form'>
                <input type="text" onChange={handleTextChange}></input>
                <button type="submit">Search</button>
                <button onClick={clearSearch}>Clear</button>
            </form>
            <select name="sort-options" defaultValue="">
                <option value="" disabled hidden>
                    Sort By
                </option>
                <option value="op1">Option1</option>
                <option value="op2">Option2</option>
                <option value="op3">Option3</option>
            </select>
        </div>
    );
};

export default NavTools;
