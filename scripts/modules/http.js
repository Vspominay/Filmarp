const httpResueqst = {

    getFromPage: function (url, page) {
        return fetch(`${url}?page=${page}`)
            .then(result => result.json())
            .catch(err => console.log(err));
    },
    getFromId: function (url, id) {
        return fetch(`${url}/${id}`)
            .then(result => result.json())
            .catch(err => console.log(err));
    }
}


export const getMoviesFromPage = httpResueqst.getFromPage;
export const getMoviesFromID = httpResueqst.getFromId;