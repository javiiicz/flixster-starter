import "../styles/Header.css";
import NavTools from "./NavTools";

const Header = ({
    handleTextChange,
    handleSearchSubmit,
    route,
    setRoute,
    clearSearch,
    setSortOption,
    openSidebar,
    setOpenSidebar,
}) => {
    const showSearch = route === "search";

    const nowTabClass = showSearch ? "tab" : "tab active";
    const searchTabClass = showSearch ? "tab active" : "tab";

    const showTabs = route === "search" || route === "nowPlaying";

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

            {showTabs && (
                <nav className="view-tabs">
                    <button
                        className={nowTabClass}
                        onClick={() => {
                            setRoute("nowPlaying");
                        }}
                    >
                        Now Playing
                    </button>
                    <button
                        className={searchTabClass}
                        onClick={handleSearchSubmit}
                    >
                        Search
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
