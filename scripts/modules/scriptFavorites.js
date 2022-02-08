import { startApp } from './startApp.js'
import { getMoviesFromID } from './http.js'


function generateArray() {
    let favoritesList = localStorage.getItem('favorites');
    if (favoritesList) {
        favoritesList = favoritesList.split(';');
        let moviesResult = [];
        for (const movieId of favoritesList) {
            if (movieId) {
                moviesResult.push(getMoviesFromID("http://api.tvmaze.com/shows", movieId))
            }
        }

        Promise.all(moviesResult)
            .then(arr => startApp(arr));
    }
}

generateArray();
