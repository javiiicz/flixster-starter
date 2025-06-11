// parses the result when fetching movies from TMDb
function parseMovieList(movieListObject) {
    let movies = [];

    movieListObject.results.forEach(movie => {
        let movieObj = {
            id: movie.id,
            title: movie.original_title,
            image: movie.poster_path,
            average: movie.vote_average
        }

        movies.push(movieObj);
    })

    return movies;
}

function parseMovieData(movieObj) {

    let details = {
        title: movieObj.title,
        image: movieObj.poster_path,
        runtime: movieObj.runtime,
        date: movieObj.release_date,
        description: movieObj.overview,
        genres: movieObj.genres.map(x => x.name)
    }

    return details
}

export {parseMovieList, parseMovieData};