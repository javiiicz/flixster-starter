import { useState, useEffect } from "react";
import "../styles/App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import { parseMovieList, parseMovieData } from "../utils/utils";
import MovieModal from "./MovieModal";

const App = () => {
    const [movieData, setMovieData] = useState([]);
    const [currentPageNP, setCurrentPageNP] = useState(1);
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [textField, setTextField] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [movie, setMovie] = useState(null);
    const [searchSubmitted, setSearchSubmitted] = useState(false)
    const [sortOption, setSortOption] = useState(null)
    const [needsSorting, setNeedsSorting] = useState(false);

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
            setNeedsSorting(true)
        } catch (e) {
            console.error(e);
        }
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
            setNeedsSorting(true)
        } catch (e) {
            console.error(e);
        }
    };

    const handleTextChange = (e) => {
        setTextField(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchSubmitted(true)
    };

    const submitSearch = () => {
        setSearchData([]);
        fetchSearch(1);
        setShowSearch(true);
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setTextField('');
        e.target.form.reset()
        setSearchSubmitted(true)
    }

    useEffect(() => {
        if (searchSubmitted) {
            submitSearch()
            setSearchSubmitted(false)
        }
    }, [searchSubmitted])

    const handleMovieClick = (id) => {
        fetchMovieDetails(id)
    };

    const fetchMovieDetails = async (movieID) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie details");
            }
            const data = await response.json();
            let parsed = parseMovieData(data)
            setMovie(parsed)
            setShowModal(true)
        } catch (e) {
            console.error(e);
        }
    };

    const sortMoviesByName = () => {
        let newMovieData = movieData.toSorted((a, b) => {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            });
        return newMovieData
    }

    const sortMoviesByDate = () => {
        let newMovieData = movieData.toSorted((a, b) => {
                if (a.release_date < b.release_date) {
                    return 1
                } else if (a.release_date > b.release_date) {
                    return -1
                } else {
                    return 0
                }
            });
        return newMovieData
    }

    const sortMoviesByRating = () => {
        let newMovieData = movieData.toSorted((a, b) => {
                return  - a.average + b.average;
            });
        return newMovieData
    }

    const applySort = () => {
        if (sortOption === "title") {
            setMovieData(sortMoviesByName())
        } else if (sortOption === "date") {
            setMovieData(sortMoviesByDate())
        } else if (sortOption === 'average') {
            setMovieData(sortMoviesByRating())
        }
    }

    useEffect(() => {
        applySort()
        if (needsSorting) {
            setNeedsSorting(false)
        }
    }, [sortOption, needsSorting]);

    return (
        <div className="App">
            <Header
                handleTextChange={handleTextChange}
                handleSearchSubmit={handleSearchSubmit}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                clearSearch={clearSearch}
                setSortOption={setSortOption}
            />

            {showSearch ? (
                <MovieList
                    loadMore={() => {
                        fetchSearch(currentPageSearch);
                    }}
                    movieData={searchData}
                    handleMovieClick={handleMovieClick}
                />
            ) : (
                <MovieList
                    loadMore={() => {
                        fetchNowPlaying(currentPageNP);
                    }}
                    movieData={movieData}
                    handleMovieClick={handleMovieClick}
                />
            )}

            {showModal && (
                <MovieModal setShowModal={setShowModal} movie={movie} />
            )}

            <Footer />
        </div>
    );
};

export default App;
