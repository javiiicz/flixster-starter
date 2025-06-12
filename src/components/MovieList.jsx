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
}) => {
    if (movieData.length === 0) {
        return (
            <main>
                <section className="nothing">
                    <h2>Nothing to show...</h2>
                </section>
            </main>
        );
    }

    return (
        <>
            <section className="movie-list-container">
                {movieData.map((movie, index) => {
                    return (
                        <MovieCard
                            key={index}
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
            <button onClick={loadMore}>Load More</button>
        </>
    );
};

export default MovieList;
