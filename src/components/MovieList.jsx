import MovieCard from "./MovieCard";
import "../styles/MovieList.css";
import { useEffect } from "react";

const MovieList = ({ movieData, loadMore, handleMovieClick }) => {
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
        <main>
            <section className="movie-list-container">
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
            </section>
            <button onClick={loadMore}>Load More</button>
        </main>
    );
};

export default MovieList;
