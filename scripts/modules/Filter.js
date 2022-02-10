import { ListContol } from "./ListControls.js";

export default class Filter {
    constructor(inputId, collectionId, filterData) {
        this.inputId = inputId;
        this.collectionId = collectionId;
        this.filterData = filterData;

        this.filterGenres = document.getElementById(inputId);
        this.genresList = document.getElementById(collectionId);
    }

    get filterValue() {
        return this.filterGenres.value;
    }

    set filterValue(value) {
        this._filterValue = value;
    }

    filterActivate() {
        const clickAtItem = (e) => {
            let selectedItem = e.target;
            this.filterValue = selectedItem.textContent;

            if (selectedItem.tagName === 'LI') {
                this.filterGenres.value = selectedItem.textContent;
                for (const element of this.genresList.children) {
                    if (element != selectedItem && element.classList.contains('activeFilter')) {
                        element.classList.remove('activeFilter');
                    }
                    else {
                        selectedItem.classList.add('activeFilter');
                    }
                }
            }
        }

        this.filterGenres.addEventListener('focus', () => {

            this.genresList.classList.add('showList');
        });

        this.genresList.addEventListener('click', clickAtItem);

        this.filterGenres.addEventListener('blur', () => {
            setTimeout(() => {
                this.genresList.classList.remove('showList');
                switch (this.inputId) {
                    case 'filterLanguges':
                        new ListContol(null, null, this._filterValue, null, null);

                        break;
                    case 'filterGenre':
                        new ListContol(null, this._filterValue, null, null, null);

                        break;
                    default:
                        break;
                }
            }, 100);
        });
    }

    fillFilter() {
        for (const filterItem of this.filterData) {
            this.genresList.innerHTML += `<li class="contols__list-item">${filterItem}</li>`;
        }
    }
}



