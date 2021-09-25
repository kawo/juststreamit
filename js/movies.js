import Modal from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    function fetchUrl(url) {
        let url_data = fetch(url)
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(function(error) {
                console.log(error);
            });
        return url_data;
    };


    function fetchBestMovie() {
        let url_best_movie = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1";
        let bm_title = document.getElementById("bm_title");
        let bm_desc = document.getElementById("bm_desc");
        let bm_img = document.getElementById("bm_img");
        let bm_button = document.getElementById("bm_button");
        let modal = document.getElementById("modal");
        let movie_url;
        let movie;
        let movies = fetchUrl(url_best_movie);
        movies.then((data) => {
            movie_url = data.results[0].url;
            movie = fetchUrl(movie_url);
            movie.then((movie) => {
                bm_title.innerHTML = movie.title;
                bm_desc.innerHTML = movie.description;
                bm_img.src = movie.image_url;
                bm_button.onclick = () => {
                    let bm_modal = new Modal(movie);
                    bm_modal.modal;
                    modal.style.display = "block";
                };
            })
        });

    };

    fetchBestMovie();

});