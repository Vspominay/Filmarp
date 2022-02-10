import CardList from "./CardList.js";
import { pagination } from "./pagination.js"

export class ListContol {

    static instance;
    static _moviesListFromDom;

    constructor(movies, genresFilterValue, languageFilterValue, searchValue, moviesListFromDom) {
        if (ListContol.instance) {
            debugger;
            ListContol.instance.searchValue = searchValue;

            if (!ListContol.instance._searchValue) {
                ListContol.instance.genresFilterValue = genresFilterValue || ListContol.instance._genresFilterValue;
                ListContol.instance.languageFilterValue = languageFilterValue || ListContol.instance._languagesFilterValue;
            }

            return ListContol.instancel
        }
        ListContol._moviesListFromDom = moviesListFromDom;
        this.movies = movies;
        this.genresFilterValue = genresFilterValue;
        this.languageFilterValue = languageFilterValue;
        this.searchValue = searchValue;

        ListContol.instance = this;
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
            for (const movie of this.movies ??= ListContol.instance.movies) {
                // let tempMovie = document.getElementById(movie.id);
                if (movie.name.toLowerCase().includes(this._searchValue.toLowerCase())) {
                    arrForRender.push(movie);
                }

            }
            let renderedList = new CardList(arrForRender);
            pagination(renderedList);
            ListContol._moviesListFromDom.innerHTML = renderedList.renderMoviesList();
        }
        else {
            for (const movie of this.movies ??= ListContol.instance.movies) {

                arrForRender.push(movie);
            }
            let renderedList = new CardList(arrForRender);
            pagination(renderedList);

            ListContol._moviesListFromDom.innerHTML = renderedList.renderMoviesList();
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

        // console.log(this.movies);
        let arrForRender = [];
        for (const movie of this.movies ??= ListContol.instance.movies) {
            // let tempMovie = document.getElementById(movie.id);
            let firstOption = movie.genres.includes(this._genresFilterValue);
            let secondOption = movie.language === this._languagesFilterValue;

            if (((this._languagesFilterValue === 'All' && this._genresFilterValue === 'All')) || (option === 0 && firstOption) || (option === 1 && secondOption) || (option === 2 && firstOption && secondOption)) {
                // tempMovie.style.display = 'flex';
                arrForRender.push(movie);
            }
            // else {
            //     tempMovie.style.display = 'none';
            // }
        }

        let renderedList = new CardList(arrForRender);
        pagination(renderedList);
        // console.log(ListContol._moviesListFromDom);
        ListContol._moviesListFromDom.innerHTML = renderedList.renderMoviesList();
        // return new Promise(res => res(arrForRender));

    }
}