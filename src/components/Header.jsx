import "../styles/Header.css"
import NavTools from "./NavTools";

const Header = ({handleTextChange, submitSearch}) => {
    return (
        <header>
            <h1>🍿 Flixster 🍿</h1>

            
            <NavTools handleTextChange={handleTextChange} submitSearch={submitSearch}/>
        </header>
    )
}

export default Header;