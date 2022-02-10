import debounce from "./debounce.js";

function controlPagination() {
    const moviesList = document.querySelector('.movies-row');
    const prevArrow = document.querySelector('.pagination__prev');
    const nextArrow = document.querySelector('.pagination__next');
    const currentPage = document.querySelector('.pagination__current');
    const allPage = document.querySelector('.pagination__all');
    const cardsPerPage = document.querySelector('.cardsPerPage');
    let activated = false;
    let cardListStore;

    return (cardList) => {
        cardListStore = cardList;
        currentPage.value = "1";

        const cardsPerPageDebounce = debounce(function validatePage() {
            if (isFinite(cardsPerPage.value) && isFinite(currentPage.value) && currentPage.value > 0 && currentPage.value <= +allPage.textContent) {
                updatePagesLimit(nextArrow, prevArrow, +currentPage.value, +allPage.textContent);

                allPage.innerHTML = calculateAllPage(cardsPerPage.value, cardListStore._movies.length);
                moviesList.innerHTML = cardListStore.renderMoviesList(+currentPage.value, +cardsPerPage.value);
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

        if (activated) {
            allPage.innerHTML = calculateAllPage(cardsPerPage.value, cardListStore._movies.length);
            updatePagesLimit(nextArrow, prevArrow, +currentPage.value, +allPage.textContent);
        }
        else {
            prevArrow.addEventListener('click', () => {
                allPage.innerHTML = calculateAllPage(cardsPerPage.value, cardListStore._movies.length);
                moviesList.innerHTML = cardListStore.renderMoviesList(--currentPage.value, +cardsPerPage.value);
                updatePagesLimit(nextArrow, prevArrow, +currentPage.value, +allPage.textContent);
            });

            nextArrow.addEventListener('click', () => {
                allPage.innerHTML = calculateAllPage(cardsPerPage.value, cardListStore._movies.length);
                moviesList.innerHTML = cardListStore.renderMoviesList(++currentPage.value, +cardsPerPage.value);
                updatePagesLimit(nextArrow, prevArrow, +currentPage.value, +allPage.textContent);
            });

            cardsPerPage.addEventListener('input', cardsPerPageDebounce);
            currentPage.addEventListener('input', cardsPerPageDebounce);

            activated = true;
        }
    }
}


function checkLimitValues(pointer, pageValue, allPage, checker = 0) {
    if ((checker && pageValue === 1) || (!checker && pageValue === allPage)) {
        pointer.classList.add('blocked');
    }
    else {
        pointer.classList.remove('blocked');
    }
}

function updatePagesLimit(nextArrow, prevArrow, currentPage, allPage) {
    checkLimitValues(nextArrow, currentPage, allPage);
    checkLimitValues(prevArrow, currentPage, allPage, 1);
}

function calculateAllPage(cardsPerPage, allMovies) {
    console.log(cardsPerPage);
    console.log(allMovies);
    return Math.ceil(allMovies / cardsPerPage);
}

export const pagination = controlPagination();