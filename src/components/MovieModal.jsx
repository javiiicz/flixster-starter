import "../styles/MovieModal.css";

const MovieModal = () => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Movie Title</h2>
                <img src="Movie Image" alt="Movie Image"></img>
                <p>
                    <span>Runtime:</span> time
                </p>
                <p>
                    <span>Release Date:</span> date
                </p>
                <p>
                    <span>Overview:</span> desc
                </p>
                <p>
                    <span>Genres:</span> genres
                </p>

                <button>Close</button>
            </div>
        </div>
    );
};

export default MovieModal;
