import "../styles/Header.css"

const Header = () => {
    return (
        <header>
            <h1>🍿 Flixster 🍿</h1>

            
            <div className="tools">
                <form className="search-form">
                    <input type="text"></input>
                    <button type="submit">Search</button>
                </form>
                <select name="sort-options" defaultValue="">
                    <option value="" disabled hidden>Sort By</option>
                    <option value="op1">Option1</option>
                    <option value="op2">Option2</option>
                    <option value="op3">Option3</option>
                </select>
            </div>
        </header>
    )
}

export default Header;