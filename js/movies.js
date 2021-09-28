import Modal from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");

    function apiPagination(number_of_movies) {
        let pages_number = 1;
        if (number_of_movies < 5) {
            console.log("apiPagination number of pages: ");
            console.log(pages_number);
            return pages_number;
        };
        while (number_of_movies > 4) {
            pages_number++;
            number_of_movies = number_of_movies - 4;
        }
        console.log("apiPagination number of pages: ");
        console.log(pages_number);
        return pages_number;
    };

    async function fetchMovies(number_of_movies = 1, categorie = "all") {
        let movie_url;
        let pages_number = apiPagination(number_of_movies);
        console.log("fetchMovie number of pages: ");
        console.log(pages_number);
        var movie;
        var movies;
        if (categorie == "all") {
            let best_movies_url = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1";
            if (number_of_movies < 5) {
                movies = fetch(best_movies_url)
                    .then((data) => data.json())
                    .then((data) => {
                        for (var i = 0; i < number_of_movies; i++) {
                            console.log("fetchBestMovies loop number: " + i);
                            console.log(data);
                            movie_url = data.results[i].url;
                            movie = fetch(movie_url)
                                .then((data) => data.json())
                                .then(movie => {
                                    console.log("fetchBestMovies movie: ");
                                    console.log(movie);
                                    return movie;
                                });
                        };
                    });
                await movies;
                return movie;
            };
        };
    };

    function bestMovieAllTime() {
        let bm_title = document.getElementById("bm_title");
        let bm_desc = document.getElementById("bm_desc");
        let bm_img = document.getElementById("bm_img");
        let bm_button = document.getElementById("bm_button");
        let best_movie = fetchMovies();
        console.log("bestMovieAllTime: ");
        console.log(best_movie);
        best_movie.then((movie) => {
            console.log("bestMovieAllTime result: ");
            console.log(best_movie);
            bm_title.innerHTML = movie.title;
            bm_desc.innerHTML = movie.description;
            bm_img.src = movie.image_url;
            bm_button.onclick = () => {
                let bm_modal = new Modal(movie);
                bm_modal.modal;
                modal.style.display = "block";
            };
        })
        best_movie.catch(function(error) {
            console.log(error);
        });
    };

    function bestSevenMovies() {
        let best_movies = fetchMovies(5);
        console.log("bestSevenMovies: ");
        console.log(best_movies);
    };

    bestMovieAllTime();
    bestSevenMovies();

});