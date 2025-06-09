import { useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css"
import { parseMovieList } from "./utils/utils";

const MovieList = () => {
    let [movieData, setMovieData] = useState([]);

    const url = 'https://api.themoviedb.org/3/movie/now_playing';
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2EwZTJmZTU0MjY4ZWFiNzg0MDFhNWExYjViNjRlNCIsIm5iZiI6MTc0OTQ4Nzc0MS43MjQsInN1YiI6IjY4NDcxMDdkZjA0YWFhZmI3ODNmY2I3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BXe1UTRF5PF8ozI4QcxyMiA0UD9xZHl96EmIarPmdE0'
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
            {movieData.map(movie => {
                return (<MovieCard title={movie.title} image={movie.image} average={movie.average}/>)
            })}
        </main>
    )
}

export default MovieList;