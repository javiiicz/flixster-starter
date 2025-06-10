import "../styles/Header.css"
import NavTools from "./NavTools";

const Header = ({handleTextChange, submitSearch, showSearch, setShowSearch}) => {
    const nowTabClass = showSearch ? "tab" : "tab active"
    const searchTabClass = showSearch ? "tab active" : "tab"

    return (
        <header>
            <div className="header-container">
                <h1>🍿 Flixster 🍿</h1>
                <NavTools handleTextChange={handleTextChange} submitSearch={submitSearch}/>
            </div>

            <div className="view-tabs">
                <button className={nowTabClass} onClick={() => {setShowSearch(false)}}>Now Playing</button>
                <button className={searchTabClass} onClick={submitSearch}>Search</button>
            </div>
        </header>
    )
}

export default Header;