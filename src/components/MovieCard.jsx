import PropTypes from "prop-types";
import "../styles/MovieCard.css"

const MovieCard = ({title, image, average}) => {
    let image_src = !(image === null) ? `http://image.tmdb.org/t/p/w500/${image}` : "../../public/placeholder_img.svg"

    return (
        <div className="movie-card">
            <img src={image_src} alt={title} className="movie-image"></img>
            <h2 className="movie-title">{title}</h2>
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