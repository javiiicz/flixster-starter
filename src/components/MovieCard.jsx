import PropTypes from "prop-types";
import "../styles/MovieCard.css";
import { useEffect, useState } from "react";

const MovieCard = ({
    movie,
    handleMovieClick,
    handleMovieLike,
    handleMovieWatch,
    likedMovies,
    watchedMovies,
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    let image_src = !(movie.image === null)
        ? `http://image.tmdb.org/t/p/w500/${movie.image}`
        : "../../public/placeholder_img.svg";

    const togglLike = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };
    const toggleWatch = (e) => {
        e.stopPropagation();
        setIsWatched(!isWatched);
    };

    useEffect(() => {
        handleMovieLike(movie, isLiked);
    }, [isLiked]);

    useEffect(() => {
        handleMovieWatch(movie, isLiked);
    }, [isWatched]);

    useEffect(() => {
        if (likedMovies.includes(movie) && !isLiked) {
            setIsLiked(true);
        }

        if (watchedMovies.includes(movie) && !isWatched) {
            setIsWatched(true);
        }
    }, []);

    return (
        <article
            className="movie-card"
            onClick={() => {
                handleMovieClick(movie.id);
            }}
        >
            <img
                src={image_src}
                alt={`${movie.title} Movie Poster`}
                className="movie-image"
            ></img>
            <div className="user-buttons">
                <div className="icon-container" onClick={togglLike}>
                    <img
                        src="./heart.svg"
                        className={
                            isLiked ? `icon heart iactive` : `icon heart`
                        }
                        alt="Add to Liked"
                    ></img>
                </div>
                <div className="icon-container" onClick={toggleWatch}>
                    <img
                        src="./eye.svg"
                        className={isWatched ? `icon eye iactive` : `icon eye`}
                        alt="Add to Watched"
                    ></img>
                </div>
            </div>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">Rating: {movie.average}</p>
        </article>
    );
};

export default MovieCard;
