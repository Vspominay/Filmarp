import { getMoviesFromPage } from './modules/http.js'
import { startApp } from './modules/startApp.js';

(function () {
    getMoviesFromPage("http://api.tvmaze.com/shows", 1)
        .then(moviesArray => startApp(moviesArray));
})()


