// parses the result when fetching movies from TMDb
function parseMovieList(movieListObject) {
    let movies = [];

    movieListObject.results.forEach(movie => {
        let movieObj = {
            title: movie.original_title,
            image: movie.backdrop_path,
            average: movie.vote_average
        }

        movies.push(movieObj);
    })

    return movies;
}

export {parseMovieList};