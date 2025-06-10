import { useState, useEffect } from "react";
import "../styles/App.css";
import MovieList from "./MovieList";
import Header from "./Header";
import Footer from "./Footer";
import { parseMovieList } from "../utils/utils";

const App = () => {
    let [movieData, setMovieData] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [textField, setTextField] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchData = async () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovieData((prev) => prev.concat(parseMovieList(data)));
        setCurrentPage((prev) => prev + 1);

        // error handling
    };

    const handleTextChange = (e) => {
        setTextField(e.target.value);
    };

    const submitSearch = (e) => {
        e.preventDefault()
        console.log(textField)
    }

    return (
        <div className="App">
            <Header handleTextChange={handleTextChange} submitSearch={submitSearch}/>
            <MovieList loadMore={fetchData} movieData={movieData} />
            <Footer />
        </div>
    );
};

export default App;
