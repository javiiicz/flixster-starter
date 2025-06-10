import { useState, useEffect } from "react";
import "../styles/App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import { parseMovieList } from "../utils/utils";

const App = () => {
    const [movieData, setMovieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [textField, setTextField] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        try {
            const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=${currentPage}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie data");
            }
            const data = await response.json();
            setMovieData((prev) => prev.concat(parseMovieList(data)));
            setCurrentPage((prev) => prev + 1);
        } catch (e) {
            console.error(e);
        }

        // error handling
    };

    const searchMovies = async () => {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${textField}&api_key=${apiKey}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie data");
            }
            const data = await response.json();
            setSearchData((prev) => prev.concat(parseMovieList(data)));
            setCurrentPage((prev) => prev + 1);
        } catch (e) {
            console.error(e);
        }
    }

    const handleTextChange = (e) => {
        setTextField(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault();
        searchMovies()
    };

    return (
        <div className="App">
            <Header
                handleTextChange={handleTextChange}
                submitSearch={submitSearch}
            />
            <MovieList loadMore={fetchData} movieData={movieData} />
            <Footer />
        </div>
    );
};

export default App;
