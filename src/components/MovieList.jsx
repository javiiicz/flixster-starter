import MovieCard from "./MovieCard";
import "../styles/MovieList.css";
import { useEffect } from "react";

const MovieList = ({
    movieData,
    loadMore,
    handleMovieClick,
    handleMovieLike,
    handleMovieWatch,
    likedMovies,
    watchedMovies,
    route
}) => {
    if (movieData.length === 0) {
        return (
                <section className="nothing">
                    <h2>Nothing to show...</h2>
                </section>
        );
    }

    return (
        <div className="movie-content">
            <section className="movie-list-container">
                {movieData.map((movie, index) => {
                    return (
                        <MovieCard
                            key={`${route}-${index}`}
                            movie={movie}
                            handleMovieClick={handleMovieClick}
                            handleMovieLike={handleMovieLike}
                            handleMovieWatch={handleMovieWatch}
                            likedMovies={likedMovies}
                            watchedMovies={watchedMovies}
                        />
                    );
                })}
            </section>
            {loadMore && (
                <button onClick={loadMore}>Load More</button>
            )}
        </div>
    );
};

export default MovieList;
