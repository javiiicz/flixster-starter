import { useState, useEffect } from "react";
import "../styles/App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import {
    parseMovie,
    parseMovieList,
    parseMovieData,
    parseMovieVideos,
} from "../utils/utils";
import MovieModal from "./MovieModal";
import Sidebar from "./Sidebar";

const App = () => {
    const [movieData, setMovieData] = useState([]);
    const [currentPageNP, setCurrentPageNP] = useState(1);
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const [textField, setTextField] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [movie, setMovie] = useState(null);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [sortOption, setSortOption] = useState(null);
    const [needsSorting, setNeedsSorting] = useState(false);
    const [videoLink, setVideoLink] = useState(null);
    const [likedMovies, setLikedMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    const [route, setRoute] = useState('nowPlaying')

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
            setNeedsSorting(true);
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
            setNeedsSorting(true);
        } catch (e) {
            console.error(e);
        }
    };

    const handleTextChange = (e) => {
        setTextField(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchSubmitted(true);
    };

    const submitSearch = () => {
        setSearchData([]);
        fetchSearch(1);
        setRoute('search')
    };

    const clearSearch = (e) => {
        e.preventDefault();
        setTextField("");
        e.target.form.reset();
        setSearchSubmitted(true);
    };

    useEffect(() => {
        if (searchSubmitted) {
            submitSearch();
            setSearchSubmitted(false);
        }
    }, [searchSubmitted]);

    const handleMovieClick = (id) => {
        fetchMovieDetails(id);
        fetchMovieVideo(id);
    };

    const fetchMovieDetails = async (movieID) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie details");
            }
            const data = await response.json();
            let parsed = parseMovieData(data);
            setMovie(parsed);
            setShowModal(true);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchMovieVideo = async (movieID) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch movie video");
            }
            const data = await response.json();
            let parsed = parseMovieVideos(data);
            setVideoLink(parsed);
        } catch (e) {
            console.error(e);
        }
    };

    const sortMoviesByName = () => {
        let newMovieData = movieData.toSorted((a, b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        });
        return newMovieData;
    };

    const sortMoviesByDate = () => {
        let newMovieData = movieData.toSorted((a, b) => {
            if (a.release_date < b.release_date) {
                return 1;
            } else if (a.release_date > b.release_date) {
                return -1;
            } else {
                return 0;
            }
        });
        return newMovieData;
    };

    const sortMoviesByRating = () => {
        let newMovieData = movieData.toSorted((a, b) => {
            return -a.average + b.average;
        });
        return newMovieData;
    };

    const applySort = () => {
        if (sortOption === "title") {
            setMovieData(sortMoviesByName());
        } else if (sortOption === "date") {
            setMovieData(sortMoviesByDate());
        } else if (sortOption === "average") {
            setMovieData(sortMoviesByRating());
        }
    };

    const handleMovieLike = (movie, adding) => {
        if (adding) {
            if (likedMovies.includes(movie)) {
                return;
            }
            setLikedMovies([...likedMovies, movie]);
        } else {
            if (likedMovies.length === 0) {
                return;
            }
            const newList = likedMovies.filter((x) => x !== movie);
            setLikedMovies(newList);
        }
    };

    const handleMovieWatch = (movie, adding) => {
        if (adding) {
            if (watchedMovies.includes(movie)) {
                return;
            }
            setWatchedMovies([...watchedMovies, movie]);
        } else {
            if (watchedMovies.length === 0) {
                return;
            }
            const newList = watchedMovies.filter((x) => x !== movie);
            setWatchedMovies(newList);
        }
    };

    useEffect(() => {
        applySort();
        if (needsSorting) {
            setNeedsSorting(false);
        }
    }, [sortOption, needsSorting]);

    const returnList = (route) => {
        if (route === "nowPlaying") {
            return (
                <MovieList
                        loadMore={() => {
                            fetchNowPlaying(currentPageNP);
                        }}
                        movieData={movieData}
                        handleMovieClick={handleMovieClick}
                        handleMovieLike={handleMovieLike}
                        handleMovieWatch={handleMovieWatch}
                        likedMovies={likedMovies}
                        watchedMovies={watchedMovies}
                    />
            )
        }

        if (route === "search") {
            return (
                <MovieList
                        loadMore={() => {
                            fetchSearch(currentPageSearch);
                        }}
                        movieData={searchData}
                        handleMovieClick={handleMovieClick}
                        handleMovieLike={handleMovieLike}
                        handleMovieWatch={handleMovieWatch}
                        likedMovies={likedMovies}
                        watchedMovies={watchedMovies}
                    />
            )
        }

        if (route === 'liked') {
            return (
                <MovieList
                        loadMore={null}
                        movieData={likedMovies}
                        handleMovieClick={handleMovieClick}
                        handleMovieLike={handleMovieLike}
                        handleMovieWatch={handleMovieWatch}
                        likedMovies={likedMovies}
                        watchedMovies={watchedMovies}
                    />
            )
        }

        if (route === watched) {
            return (
                <MovieList
                        loadMore={null}
                        movieData={watchedMovies}
                        handleMovieClick={handleMovieClick}
                        handleMovieLike={handleMovieLike}
                        handleMovieWatch={handleMovieWatch}
                        likedMovies={likedMovies}
                        watchedMovies={watchedMovies}
                    />
            )
        }
    }

    return (
        <div className="App">
            <Header
                handleTextChange={handleTextChange}
                handleSearchSubmit={handleSearchSubmit}
                route={route}
                setRoute={setRoute}
                clearSearch={clearSearch}
                setSortOption={setSortOption}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
            />

            <main className={openSidebar ? "main-open-sidebar" : ""}>
                {openSidebar && <Sidebar />}
                {returnList(route)}
            </main>

            <MovieModal
                showModal={showModal}
                setShowModal={setShowModal}
                movie={movie}
                videoLink={videoLink}
                showTrailer={showTrailer}
                setShowTrailer={setShowTrailer}
            />

            <Footer />
        </div>
    );
};

export default App;
