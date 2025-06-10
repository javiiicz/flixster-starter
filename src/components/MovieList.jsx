import MovieCard from "./MovieCard";
import "../styles/MovieList.css";
import { useEffect } from "react";

const MovieList = ({ movieData, loadMore }) => {
    return (
        <main>
            {!(movieData.length === 0) ? (
                <>
                    <div className="movie-list-container">
                        {movieData.map((movie, index) => {
                            return (
                                <MovieCard
                                    key={index}
                                    title={movie.title}
                                    image={movie.image}
                                    average={movie.average}
                                />
                            );
                        })}
                    </div>
                    <button onClick={loadMore}>Load More</button>
                </>
            ) : (
                <div className="nothing">
                    <h2>Nothing to show...</h2>
                </div>
            )}
        </main>
    );
};

export default MovieList;
