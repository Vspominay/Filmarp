import { startApp } from './startApp.js'
import { getMoviesFromID } from './http.js'


function generateArray() {
    let favoritesList = localStorage.getItem('favorites');
    const emptyListText = document.querySelector('.movies-text');
    console.log(!!favoritesList.length);
    if (favoritesList) {
        const moviesListContent = document.querySelector('.movies-row');
        moviesListContent.classList.remove('hide');
        emptyListText.classList.add('hide');

        favoritesList = favoritesList.split(';');
        favoritesList.length = favoritesList.length - 1;

        let moviesResult = favoritesList.map(elem => {
            if (elem) {
                return getMoviesFromID("http://api.tvmaze.com/shows", elem)
            }
        });

        Promise.all(moviesResult)
            .then(arr => startApp(arr))
            .catch(err => console.warn(err));
    }
    else {
        emptyListText.classList.add('show');
    }
}

generateArray();
