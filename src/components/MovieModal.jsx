import "../styles/MovieModal.css";

const MovieModal = ({ setShowModal, movie }) => {
    const handleClickInside = (e) => {
        e.stopPropagation();
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
                <div className="poster-container">
                    <div className="backdrop-image">
                        <img
                        src={
                            movie.image
                                ? `http://image.tmdb.org/t/p/w780/${movie.image}`
                                : "../../public/placeholder_img.svg"
                        }
                        alt={movie.title}
                        
                    ></img>
                    </div>
                    <div className="details-container">
                        <p>
                            <span>Runtime:</span>{" "}
                            {movie ? movie.runtime : "runtime"} minutes
                        </p>
                        <p>
                            <span>Release Date:</span>{" "}
                            {movie ? movie.date : "date"}
                        </p>
                        <p>
                            <span>Overview:</span>{" "}
                            {movie ? movie.description : "desc"}
                        </p>
                        <div>
                            <p>
                                <span>Genres:</span>
                            </p>
                            {movie ? (
                                <div className="genre-container">
                                    {movie.genres.map((genre) => {
                                        return (
                                            <div className="genre-card">
                                                <p>{genre}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                "genres"
                            )}
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
