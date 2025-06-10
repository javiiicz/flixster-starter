import "../styles/MovieModal.css";

const MovieModal = ({setShowModal, movie}) => {
    const handleClickInside = (e) => {
        e.stopPropagation()
    }

    return (
        <div className="modal-overlay" onClick={() => {setShowModal(false)}}>
            <div className="modal-content" onClick={handleClickInside}>
                <h2>{movie ? movie.title: "Movie Title"}</h2>
                <img src={movie ? movie.image : "Movie Image"} alt="Movie Image"></img>
                <p>
                    <span>Runtime:</span> {movie ? movie.runtime : "runtime"}
                </p>
                <p>
                    <span>Release Date:</span> {movie ? movie.date : "date"}
                </p>
                <p>
                    <span>Overview:</span> {movie ? movie.description : "desc"}
                </p>
                <p>
                    <span>Genres:</span> {movie ? movie.genres : "genres"}
                </p>

                <button onClick={() => {setShowModal(false)}}>Close</button>
            </div>
        </div>
    );
};

export default MovieModal;
