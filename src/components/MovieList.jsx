import MovieCard from "./MovieCard";
import "../styles/MovieList.css"

const MovieList = ({movieData, loadMore}) => {
    

    return (
        <main>
            <div className="movie-list-container">
                {movieData && movieData.map((movie,index) => {
                    return (<MovieCard key={index} title={movie.title} image={movie.image} average={movie.average}/>)
                })}
            </div>
            <button onClick={loadMore}>Load More</button>
        </main>
    )
}

export default MovieList;