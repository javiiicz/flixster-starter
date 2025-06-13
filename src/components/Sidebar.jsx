import "../styles/Sidebar.css";

const Sidebar = ({ route, setRoute, openSidebar }) => {
    return (
        <aside className={openSidebar ? "sidebar-content sidebar-visible" : "sidebar-content"} >
            <ul className="page-list">
                <li
                    className={(route === "nowPlaying" || route === "search") ? "selected" : ""}
                    onClick={() => {
                        setRoute("nowPlaying");
                    }}
                >
                    Home
                </li>
                <li
                    className={route === "liked" ? "selected" : ""}
                    onClick={() => {
                        setRoute("liked");
                    }}
                >
                    Liked
                </li>
                <li
                    className={route === "watched" ? "selected" : ""}
                    onClick={() => {
                        setRoute("watched");
                    }}
                >
                    Watched
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
