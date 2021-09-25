import Modal from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");

    function fetchUrl(url) {
        let url_data = fetch(url)
            .then((response) => response.json())
            .then(data => {
                return data;
            })
            .catch(function(error) {
                console.log("fetchURL: ");
                console.log(error);
            });
        return url_data;
    };

    function fetchBestMovies(number_of_movies = 1, categorie = "all") {
        let movie_url;
        var movie;
        var movies;
        if (categorie == "all") {
            let best_movies_url = "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1";
            movies = fetchUrl(best_movies_url);
            movies.then((data) => {
                for (var i = 0; i < number_of_movies; i++) {
                    console.log("fetchBestMovies loop number: " + i);
                    if (i == 3) {
                        console.log("Loop reset: ");
                        console.log(data.next);
                        console.log("Modulo: ");
                        console.log(number_of_movies % 4);
                    }
                    movie_url = data.results[i].url;
                    movie = fetchUrl(movie_url)
                        .then(movie => {
                            console.log("fetchBestMovies movie: ");
                            console.log(movie);
                            return movie;
                        });
                };
            });
            return movies.then(() => {
                return movie;
            });
        };
    };

    function bestMovieAllTime() {
        let bm_title = document.getElementById("bm_title");
        let bm_desc = document.getElementById("bm_desc");
        let bm_img = document.getElementById("bm_img");
        let bm_button = document.getElementById("bm_button");
        let best_movie = fetchBestMovies();
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
        let best_movies = fetchBestMovies(7);
        console.log("bestSevenMovies: ");
        console.log(best_movies);
    };

    bestMovieAllTime();
    bestSevenMovies();

});