import { useEffect, useState } from "react";
import "../styles/MovieModal.css";

const MovieModal = ({ showModal, setShowModal, movie, videoLink, showTrailer, setShowTrailer }) => {
    if (!movie) {
        return 
    }

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
            className={showModal ? "modal-overlay visible" : "modal-overlay"}
            onClick={() => {
                setShowModal(false);
                setShowTrailer(false);
            }}
        >
            <aside className={showModal ? "modal-content visible" : "modal-content"} onClick={handleClickInside}>
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
                                            : "/placeholder_backdrop.svg"
                                    }
                                    alt={`${movie.title} Backdrop`}
                                ></img>
                                {videoLink && (
                                    <iframe
                                        className="video-player"
                                        src={`https://www.youtube.com/embed/${videoLink}`}
                                        allow="autoplay"
                                        frameBorder={0}
                                        allowFullScreen
                                        alt={`${movie.title} Trailer`}
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
            </aside>
        </div>
    );
};

export default MovieModal;
