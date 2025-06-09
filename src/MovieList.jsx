import { useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css"
import { parseMovieList } from "./utils/utils";

const MovieList = () => {
    let [movieData, setMovieData] = useState([]);

    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}`;
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
        }
    };

    const fetchData = async () => {
        const response  = await fetch(url, options)
        const data = await response.json();
        setMovieData(parseMovieList(data))
    }

    fetchData()


    return (
        <main className="movie-list-container">
            {movieData && movieData.map((movie,index) => {
                return (<MovieCard key={index} title={movie.title} image={movie.image} average={movie.average}/>)
            })}
        </main>
    )
}

export default MovieList;