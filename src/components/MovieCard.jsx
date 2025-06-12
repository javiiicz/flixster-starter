import PropTypes from "prop-types";
import "../styles/MovieCard.css"

const MovieCard = ({movie_id, title, image, average, handleMovieClick}) => {
    let image_src = !(image === null) ? `http://image.tmdb.org/t/p/w500/${image}` : "../../public/placeholder_img.svg"

    return (
        <article className="movie-card" onClick={() => {handleMovieClick(movie_id)}}>
            <img src={image_src} alt={`${title} Movie Poster`} className="movie-image"></img>
            <div className="user-buttons">
                <div className="icon-container"><img src="./heart.svg" className="icon heart" alt="Add to Liked"></img></div>
                <div className="icon-container"><img src="./eye.svg" className="icon eye" alt="Add to Watched"></img></div>
            </div>
            <h3 className="movie-title">{title}</h3>
            <p className="movie-rating">Rating: {average}</p>
        </article>
    )
}

export default MovieCard;

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    average: PropTypes.number.isRequired
}