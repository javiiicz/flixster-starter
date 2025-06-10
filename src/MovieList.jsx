import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css"
import { parseMovieList } from "./utils/utils";

const MovieList = () => {
    let [movieData, setMovieData] = useState([]);
    let [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        initialFetchData()
    }, [])

    const apiKey = import.meta.env.VITE_API_KEY;
    
    const initialFetchData = async () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}`;
        const response  = await fetch(url)
        const data = await response.json();
        setMovieData(parseMovieList(data))
        setCurrentPage(prev => prev + 1)
        console.log(currentPage)

        // error handling
    }

    const loadMore = async () => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apiKey}&page=${currentPage}`;
        const response  = await fetch(url)
        const data = await response.json();
        setMovieData(prev => prev.concat(parseMovieList(data)))
        setCurrentPage(prev => prev + 1)
        console.log(currentPage)
    }

    return (
        <main>
            <div className="movie-list-container">
                {movieData && movieData.map((movie,index) => {
                    return (<MovieCard key={index} title={movie.title} image={movie.image} average={movie.average}/>)
                })}
            </div>
            <button onClick={loadMore}>Load More</button>
        </main>
    )
}

export default MovieList;