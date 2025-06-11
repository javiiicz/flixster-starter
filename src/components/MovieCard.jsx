import PropTypes from "prop-types";
import "../styles/MovieCard.css"

const MovieCard = ({movie_id, title, image, average, handleMovieClick}) => {
    let image_src = !(image === null) ? `http://image.tmdb.org/t/p/w500/${image}` : "../../public/placeholder_img.svg"

    return (
        <div className="movie-card" onClick={() => {handleMovieClick(movie_id)}}>
            <img src={image_src} alt={`${title} Movie Poster`} className="movie-image"></img>
            <h3 className="movie-title">{title}</h3>
            <p className="movie-rating">Rating: {average}</p>
        </div>
    )
}

export default MovieCard;

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    average: PropTypes.number.isRequired
}