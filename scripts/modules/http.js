const httpResueqst = {

    getFromPage: function (url, page) {
        return fetch(`${url}?page=${page}`)
            .then(result => result.json())
            .catch(err => console.warn(err));
    },
    getFromId: function (url, id) {
        return fetch(`${url}/${id}`)
            .then(result => result.json())
            .catch(err => console.warn(err));
    }
}


export const getMoviesFromPage = httpResueqst.getFromPage;
export const getMoviesFromID = httpResueqst.getFromId;