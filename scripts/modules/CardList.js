import Card from "./Card.js";

export default class CardList {
    constructor(movies) {
        this.movies = movies;
    }

    get movies() {
        return this._movies;
    }

    set movies(value) {
        this._movies = value;
    }

    generateFilterInformation() {
        let genress = [];
        let languages = [];

        for (const { language, genres } of this.movies) {
            genress.push(genres);
            languages.push(language);
        }
        genress = [...new Set(genress.flat(Infinity))];
        languages = [...new Set(languages)];

        return { genress, languages };
    }

    renderMoviesList(currentPage = 1, cardsPerPage = 8, movies = this.movies) {
        let start = (currentPage - 1) * cardsPerPage;
        let slicedMovies = movies.slice(start, start + cardsPerPage);
        let tempList = document.createElement('div');

        for (const movie of slicedMovies) {
            let card = new Card(movie.id, movie.rating.average, movie.image.medium, movie.name, movie.genres, movie.language);
            tempList.innerHTML += card.generateCard();
        }

        return tempList.innerHTML;
    }
}