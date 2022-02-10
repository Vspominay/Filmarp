export default class Card {

    static _localStorage = localStorage.getItem('favorites') ?? '';

    constructor(id, rate, img, name, genres, language) {
        this.rate = rate;
        this.img = img;
        this.name = name;
        this.id = id;
        this.genres = genres;
        this.language = language;
    }

    generateCard() {
        let name = this.cropName();
        let isInFavoritesList = Card._localStorage.split(';').includes(this.id + '') ? true : false;

        return `
        <div class="movies-col" id=${this.id}>
            <div class="movies-item">
                        <div class="movies-item__content">
                            <div class="movies-item__rate movies-item__controls">
                                <span class="icon-star"></span>
                                <p>${this.rate ?? ".."}</p>
                            </div>

                            <div class="movies-item__favorites ${isInFavoritesList ? 'addedToFavorites' : ''} movies-item__controls">
                                <span class="icon-heart"></span>
                            </div>

                            <img class="movies-item-img" src="${this.img}" height="370" alt="movie image">
                        </div>
                        
                        <div class="movies-item__name">${name}</div>
            </div>
        </div>`;
    }

    cropName() {
        return this.name.length > 15 ? this.name.slice(0, 17) + '...' : this.name;
    }
}