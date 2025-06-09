import PropTypes from "prop-types";
import "./MovieCard.css"

const MovieCard = ({title, image, average}) => {
    return (
        <div className="movie-card">
            <img src={`http://image.tmdb.org/t/p/w500/${image}`} alt={title} className="movie-image"></img>
            <h2 className="movie-title">{title}</h2>
            <p className="movie-rating">Rating: {average}</p>
        </div>
    )
}

export default MovieCard;

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    average: PropTypes.number.isRequired
}