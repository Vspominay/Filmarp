import CardList from "./CardList.js";
import { pagination } from "./pagination.js"

export class ListContol {

    static _depot;
    static _moviesListFromDom;

    constructor(movies, genresFilterValue, languageFilterValue, searchValue, moviesListFromDom) {
        if (ListContol._depot) {
            ListContol._depot.searchValue = searchValue;

            if (!ListContol._depot._searchValue) {
                ListContol._depot.genresFilterValue = genresFilterValue || ListContol._depot._genresFilterValue;
                ListContol._depot.languageFilterValue = languageFilterValue || ListContol._depot._languagesFilterValue;
            }

            return ListContol._depotl
        }
        ListContol._moviesListFromDom = moviesListFromDom;
        this.movies = movies;
        this.genresFilterValue = genresFilterValue;
        this.languageFilterValue = languageFilterValue;
        this.searchValue = searchValue;

        ListContol._depot = this;
    }

    set genresFilterValue(value) {
        this._genresFilterValue = value;
        this.filterList();
    }

    set languageFilterValue(value) {
        this._languagesFilterValue = value;
        this.filterList();
    }

    set searchValue(value) {
        this._searchValue = value;
        this.searchByFiled();
    }

    searchByFiled() {
        let arrForRender = [];

        if (this._searchValue) {
            for (const movie of this.movies ??= ListContol._depot.movies) {
                if (movie.name.toLowerCase().includes(this._searchValue.toLowerCase())) {
                    arrForRender.push(movie);
                }
            }

            this.updateMoviesBlock(ListContol._moviesListFromDom, arrForRender);
        }
        else {
            for (const movie of this.movies ??= ListContol._depot.movies) {
                arrForRender.push(movie);
            }

            this.updateMoviesBlock(ListContol._moviesListFromDom, arrForRender);
        }
    }

    filterList() {
        let option;

        if ((this._genresFilterValue && !this._languagesFilterValue) || this._languagesFilterValue === 'All') {
            option = 0;
        }
        else if ((!this._genresFilterValue && this._languagesFilterValue) || this._genresFilterValue === 'All') {
            option = 1;
        }
        else if (this._genresFilterValue && this._languagesFilterValue) {
            option = 2;
        }
        else {
            return;
        }

        let arrForRender = [];
        for (const movie of this.movies ??= ListContol._depot.movies) {
            let firstOption = movie.genres.includes(this._genresFilterValue);
            let secondOption = movie.language === this._languagesFilterValue;

            if (((this._languagesFilterValue === 'All' && this._genresFilterValue === 'All')) || (option === 0 && firstOption) || (option === 1 && secondOption) || (option === 2 && firstOption && secondOption)) {
                arrForRender.push(movie);
            }
        }

        this.updateMoviesBlock(ListContol._moviesListFromDom, arrForRender);
    }


    updateMoviesBlock(moviesListDom, arrForRender) {
        let renderedList = new CardList(arrForRender);
        pagination(renderedList);
        moviesListDom.innerHTML = renderedList.renderMoviesList();
    }
}