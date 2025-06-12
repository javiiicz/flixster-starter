import "../styles/Header.css";
import NavTools from "./NavTools";

const Header = ({
    handleTextChange,
    handleSearchSubmit,
    showSearch,
    setShowSearch,
    clearSearch,
    setSortOption,
    openSidebar,
    setOpenSidebar,
}) => {
    const nowTabClass = showSearch ? "tab" : "tab active";
    const searchTabClass = showSearch ? "tab active" : "tab";

    return (
        <header>
            <div className="header-container">
                <h1>🍿 Flixster 🍿</h1>
                <NavTools
                    handleTextChange={handleTextChange}
                    handleSearchSubmit={handleSearchSubmit}
                    clearSearch={clearSearch}
                    setSortOption={setSortOption}
                    openSidebar={openSidebar}
                    setOpenSidebar={setOpenSidebar}
                />
            </div>

            <nav className="view-tabs">
                <button
                    className={nowTabClass}
                    onClick={() => {
                        setShowSearch(false);
                    }}
                >
                    Now Playing
                </button>
                <button className={searchTabClass} onClick={handleSearchSubmit}>
                    Search
                </button>
            </nav>
        </header>
    );
};

export default Header;
