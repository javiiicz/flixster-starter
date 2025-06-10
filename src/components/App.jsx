import { useState, useEffect } from "react";
import "../styles/App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import { parseMovieList } from "../utils/utils";
import MovieModal from "./MovieModal";

const App = () => {
    const [movieData, setMovieData] = useState([]);
    const [currentPageNP, setCurrentPageNP] = useState(1);
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [textField, setTextField] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchNowPlaying(1);
    }, []);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchNowPlaying = async (page) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=${page}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie data");
            }
            const data = await response.json();
            setMovieData((prev) => prev.concat(parseMovieList(data)));
            setCurrentPageNP((prev) => prev + 1);
        } catch (e) {
            console.error(e);
        }

        // error handling
    };

    const fetchSearch = async (page) => {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${textField}&api_key=${apiKey}&page=${page}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie data");
            }
            const data = await response.json();
            setSearchData((prev) => prev.concat(parseMovieList(data)));
            setCurrentPageSearch((prev) => prev + 1);
        } catch (e) {
            console.error(e);
        }
    };

    const handleTextChange = (e) => {
        setTextField(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        setSearchData([])
        fetchSearch(1);
        setShowSearch(true);
    };

    return (
        <div className="App">
            <Header
                handleTextChange={handleTextChange}
                submitSearch={submitSearch}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
            />

            {showSearch ? (
                <MovieList loadMore={() => {fetchSearch(currentPageSearch)}} movieData={searchData} />
            ) : (
                <MovieList loadMore={() => {fetchNowPlaying(currentPageNP)}} movieData={movieData} />
            )}

            {showModal && <MovieModal/>}
            

            <Footer />
        </div>
    );
};

export default App;
