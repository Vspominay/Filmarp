import Card from "./Card.js";

export default class PopupCard extends Card {

    static _body = document.getElementById('body');

    get popupCard() {
        return this._popup;
    }

    constructor(id, rate, img, name, genres, languages, type, startPremier, endPremier, description, url) {
        super(id, rate, img, name, genres, languages);
        this.type = type;
        this.startPremier = startPremier;
        this.endPremier = endPremier;
        this.description = description;
        this.url = url;
    }

    generatePopup() {
        return `
        <div class="popup__inner">
            <div class="popup__content scroll">
                <div class="popup__close icon-close"></div>
                <div class="content__image ">
                    <img src="${this.img}" height="470" width="280" class="image-prewie" alt="#">
                    <div class="content__image-btn defaul-btn">
                        <a href="${this.url}">Visit site</a>
                        <div class="icon-round-next"></div>
                    </div>
                </div>
                <div class="content__text">
                    <h3 class="text-title">${this.name}</h3>
                    <div class="text-description">
                        ${this.description}
                    </div>
                    <div class="text-rate">
                        <div class="movies-item__rate movies-item__controls">
                            <span class="icon-star"></span>
                            <p>${this.rate}</p>
                        </div>
                    </div>

                    <div class="text-row">
                        <div class="text-col">
                            <div class="text-item">
                                <div class="item-name">Type</div>
                                <div class="item-value">${this.type}</div>
                            </div>
                        </div>

                        <div class="text-col">
                            <div class="text-item">
                                <div class="item-name">Language</div>
                                <div class="item-value">${this.language}</div>
                            </div>
                        </div>

                        <div class="text-col">
                            <div class="text-item">
                                <div class="item-name">Start premier</div>
                                <div class="item-value">${this.startPremier}</div>
                            </div>
                        </div>

                        <div class="text-col">
                            <div class="text-item">
                                <div class="item-name">End premier</div>
                                <div class="item-value">${this.endPremier ?? ''}</div>
                            </div>
                        </div>
                    </div>

                    <div class="text-genre">
                        <div class="item-name">Genres</div>
                        <div class="item-value">${this.genres}</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    activatePopup() {
        let srollWidth = window.innerWidth - PopupCard._body.offsetWidth;

        PopupCard._body.classList.add("hideScroll");
        PopupCard._body.style.paddingRight = srollWidth + 'px';

        this._popup = document.getElementById('popup');

        this._popup.classList.add('active');
        this._popup.innerHTML = this.generatePopup();
    }

    closePopup() {
        PopupCard._body.style.paddingRight = 0;
        PopupCard._body.classList.remove("hideScroll");
        this._popup.classList.remove('active');
    }
}