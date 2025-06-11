import MovieCard from "./MovieCard";
import "../styles/MovieList.css";
import { useEffect } from "react";

const MovieList = ({ movieData, loadMore, handleMovieClick }) => {
    if (movieData.length === 0) {
        return (
            <main>
                <div className="nothing">
                    <h2>Nothing to show...</h2>
                </div>
            </main>
        );
    }

    

    return (
        <main>
            <div className="movie-list-container">
                {movieData.map((movie, index) => {
                    return (
                        <MovieCard
                            key={index}
                            movie_id={movie.id}
                            title={movie.title}
                            image={movie.image}
                            average={movie.average}
                            handleMovieClick={handleMovieClick}
                        />
                    );
                })}
            </div>
            <button onClick={loadMore}>Load More</button>
        </main>
    );
};

export default MovieList;
