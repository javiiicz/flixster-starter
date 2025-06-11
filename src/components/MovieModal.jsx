import { useState } from "react";
import "../styles/MovieModal.css";

const MovieModal = ({ setShowModal, movie, videoLink }) => {
    const [showTrailer, setShowTrailer] = useState(false);

    const handleClickInside = (e) => {
        e.stopPropagation();
    };

    const toggleTrailer = () => {
        if (showTrailer) {
            setShowTrailer(false);
        } else {
            setShowTrailer(true);
        }
    };

    return (
        <div
            className="modal-overlay"
            onClick={() => {
                setShowModal(false);
            }}
        >
            <div className="modal-content" onClick={handleClickInside}>
                <h2>{movie ? movie.title : "Movie Title"}</h2>
                <div className="movie-container">
                    <div className="media-container">
                        <div className="slider-frame">
                            <div
                                className={
                                    showTrailer ? "slider slide2" : "slider"
                                }
                            >
                                <img
                                    src={
                                        movie.image
                                            ? `http://image.tmdb.org/t/p/w780/${movie.image}`
                                            : "../../public/placeholder_img.svg"
                                    }
                                    alt={movie.title}
                                ></img>
                                {videoLink && (
                                    <iframe
                                        className="video-player"
                                        src={`https://www.youtube.com/embed/${videoLink}`}
                                        allow="autoplay"
                                        frameBorder={0}
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        </div>
                        {videoLink && (
                            <button onClick={toggleTrailer}>
                                Toggle Backdrop / Trailer
                            </button>
                        )}
                    </div>
                    <div className="details-container">
                        <p>
                            <span>Runtime: </span>
                            {movie.runtime} minutes
                        </p>
                        <p>
                            <span>Release Date: </span>
                            {movie.date}
                        </p>
                        <p>
                            <span>Overview: </span>
                            {movie.description}
                        </p>
                        <div>
                            <p>
                                <span>Genres: </span>
                            </p>
                            <div className="genre-container">
                                {movie.genres.map((genre, index) => {
                                    return (
                                        <div key={index} className="genre-card">
                                            <p>{genre}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setShowModal(false);
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default MovieModal;
