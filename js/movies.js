import Modal from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    function createMovieUrl(id) {
        var url = "http://localhost:8000/api/v1/titles/" + id;
        return url;
    }

    function fetchUrl(url) {
        var movie = fetch(url)
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(function(error) {
                console.log(error);
            });
        return movie;
    };

    function fetchMovie(id) {
        fetch(url)
            .then((response) => response.json())
            .then(function(data) {
                console.log(data);
                let movie = data;
                console.log(movie);
                modal_button.onclick = function() {
                    var bmModal = new Modal(movie);
                    bmModal.modal;
                    modal.style.display = "block";
                };
            })
            .catch(function(error) {
                console.log(error);
            });
    };


    function fetchBestMovie() {
        var url_best_movie = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1";
        var movies = fetchUrl(url_best_movie);
        movies.then((a) => {
            console.log(a.results);
        });

    };

    fetchBestMovie();

});