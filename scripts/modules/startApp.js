import CardList from './CardList.js';
import Filter from './Filter.js';
import { ListContol } from './ListControls.js';
import { getMoviesFromID } from './http.js'
import PopupCard from './PopupCard.js';
import { pagination } from './pagination.js';
import debounce from './debounce.js';


function activeApp(moviesArray) {
    const moviesList = document.querySelector('.movies-row');
    const cardList = new CardList(moviesArray);

    function fillingFilters(movies) {
        let { genress, languages } = movies.generateFilterInformation();
        const filterGenres = new Filter("filterGenre", "genresList", genress);
        const filterLanguages = new Filter("filterLanguges", "languagesList", languages);
        filterLanguages.filterActivate();
        filterGenres.filterActivate();

        filterLanguages.fillFilter();
        filterGenres.fillFilter();

        moviesList.innerHTML = cardList.renderMoviesList();

        new ListContol(moviesArray, filterGenres.filterValue, filterLanguages.filterValue, null, moviesList);

        activateSearch();
    }

    function activateSearch() {
        const searchField = document.getElementById('searchField');
        const validationDebounce = debounce(() => new ListContol(null, null, null, searchField.value, null), 300);
        searchField.addEventListener('input', validationDebounce);
    }

    function addToFavorites() {
        moviesList.addEventListener('click', (e) => {
            let currentIconFavorite = e.target.closest('.movies-item__favorites');

            if (currentIconFavorite) {
                if (!currentIconFavorite) return;
                if (!moviesList.contains(currentIconFavorite)) return;

                if (currentIconFavorite) {
                    let movieId = currentIconFavorite.closest('.movies-col').id;
                    let favoritesMovies = localStorage.getItem('favorites') || '';

                    if (!currentIconFavorite.classList.contains('addedToFavorites')) {
                        localStorage.setItem('favorites', favoritesMovies += `${movieId};`)
                        currentIconFavorite.classList.add('addedToFavorites');
                    }
                    else {
                        let newFavorites = favoritesMovies.replace(`${movieId};`, '');
                        localStorage.setItem('favorites', newFavorites)
                        currentIconFavorite.classList.remove('addedToFavorites');
                    }
                }
            }
            else {
                let currentMovie = e.target.closest('.movies-item__content');
                if (!currentMovie) return;
                if (!moviesList.contains(currentMovie)) return;


                if (currentMovie) {
                    let movieId = currentMovie.closest('.movies-col').id;
                    getMoviesFromID("http://api.tvmaze.com/shows", movieId)
                        .then(movie => showPopup(movie))
                        .then(pop => closePopup(pop));
                }
            }
        })
    }

    function showPopup(movie) {
        let popup = new PopupCard(movie.id, movie.rating.average ?? '..', movie.image.medium, movie.name, movie.genres.join(' & '), movie.language, movie.type, movie.premiered, movie.ended ??= '-', movie.summary, movie.url);

        popup.activatePopup();

        return popup;
    }

    function closePopup(popup) {
        popup.popupCard.addEventListener('click', (e) => {
            if (!e.target.closest('.popup__content') || e.target.classList.contains('popup__close')) {
                popup.closePopup();
            }
        })
    }

    fillingFilters(cardList);
    addToFavorites();
    pagination(cardList);
}

export const startApp = activeApp;

