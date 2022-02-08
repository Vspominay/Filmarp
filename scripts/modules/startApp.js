import CardList from './CardList.js';
import Filter from './Filter.js';
import { ListContol } from './ListControls.js';
import { getMoviesFromID } from './http.js'
import PopupCard from './PopupCard.js';

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

        function filterbyGenre() {
            const filteredListMovie = new ListContol(moviesArray, filterGenres.filterValue, filterLanguages.filterValue, null, moviesList);
        }
        filterbyGenre();
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

    fillingFilters(cardList);
    addToFavorites();
    controlPagination(cardList, moviesList);

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

    function controlPagination(cardList, moviesList) {
        const countAllMovies = cardList._movies.length;
        const prevArrow = document.querySelector('.pagination__prev');
        const nextArrow = document.querySelector('.pagination__next');
        const currentPage = document.querySelector('.pagination__current');
        const allPage = document.querySelector('.pagination__all');
        const cardsPerPage = document.querySelector('.cardsPerPage');

        prevArrow.addEventListener('click', () => {
            allPage.innerHTML = calculateAllPage(cardsPerPage.value, countAllMovies);
            moviesList.innerHTML = cardList.renderMoviesList(--currentPage.value, +cardsPerPage.value);
            checkLimitValues(prevArrow, +currentPage.value, +allPage.textContent, 1);
            checkLimitValues(nextArrow, +currentPage.value, +allPage.textContent);

        });

        nextArrow.addEventListener('click', () => {
            allPage.innerHTML = calculateAllPage(cardsPerPage.value, countAllMovies);
            moviesList.innerHTML = cardList.renderMoviesList(++currentPage.value, +cardsPerPage.value);
            checkLimitValues(nextArrow, +currentPage.value, +allPage.textContent);
            checkLimitValues(prevArrow, +currentPage.value, +allPage.textContent, 1);

        });

        const cardsPerPageDebounce = debounce(function validatePage() {
            if (isFinite(cardsPerPage.value) && isFinite(currentPage.value) && currentPage.value > 0 && currentPage.value <= +allPage.textContent) {
                checkLimitValues(nextArrow, +currentPage.value, +allPage.textContent);
                checkLimitValues(prevArrow, +currentPage.value, +allPage.textContent, 1);

                allPage.innerHTML = calculateAllPage(cardsPerPage.value, countAllMovies);
                moviesList.innerHTML = cardList.renderMoviesList(+currentPage.value, +cardsPerPage.value);
            }
            else {
                if (!isFinite(cardsPerPage.value)) {
                    cardsPerPage.value = 8;
                    validatePage();
                }
                else {
                    currentPage.value = 1;
                    validatePage();
                }

            }
        }, 700);

        cardsPerPage.addEventListener('input', cardsPerPageDebounce);

        currentPage.addEventListener('input', cardsPerPageDebounce);
    }

    function checkLimitValues(pointer, pageValue, allPage, checker = 0) {
        if ((checker && pageValue === 1) || (!checker && pageValue === allPage)) {
            pointer.classList.add('blocked');
        }
        else {
            pointer.classList.remove('blocked');
        }
    }

    function calculateAllPage(cardsPerPage, allMovies) {
        return Math.ceil(allMovies / cardsPerPage);
    }

    function debounce(func, ms) {
        let timer;

        return function (...args) {
            const funcCall = () => {
                func.apply(this, ...args);
            }

            clearTimeout(timer);
            timer = setTimeout(funcCall, ms);
        }
    }
}

export const startApp = activeApp;

