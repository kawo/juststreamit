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

    async function fetchMovies(url, number_of_movies = 1) {
        let movie_url;
        let pages_number = apiPagination(number_of_movies);
        console.log("fetchMovie number of pages: ");
        console.log(pages_number);
        var movie = [];
        var movies;
        if (number_of_movies < 5) {
            movies = fetch(url)
                .then((data) => data.json())
                .then((data) => {
                    for (var i = 0; i < number_of_movies; i++) {
                        console.log("fetchMovies loop number: " + i);
                        console.log(data);
                        movie_url = data.results[i].url;
                        movie.push(fetch(movie_url)
                            .then((data) => data.json())
                            .then(movie => {
                                console.log("fetchMovies loop movie: " + i);
                                console.log(movie);
                                return movie;
                            }));
                    };
                });
        };
        await movies;
        console.log("fetchMovies movie: ");
        console.log(movie);
        return movie;
    };

    function bestMovieAllTime() {
        let bm_title = document.getElementById("bm_title");
        let bm_desc = document.getElementById("bm_desc");
        let bm_img = document.getElementById("bm_img");
        let bm_button = document.getElementById("bm_button");
        let best_movie = fetchMovies("http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1")
            .then((movies) => {
                Promise.all(movies).then(movie => {
                    bm_title.innerHTML = movie[0].title;
                    bm_desc.innerHTML = movie[0].description;
                    bm_img.src = movie[0].image_url;
                    bm_button.onclick = () => {
                        let bm_modal = new Modal(movie[0]);
                        bm_modal.modal;
                        modal.style.display = "block";
                    };
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    function bestSevenMovies() {
        let img_carousel1 = document.getElementById("img_carousel1");
        let img_carousel2 = document.getElementById("img_carousel2");
        let img_carousel3 = document.getElementById("img_carousel3");
        let img_carousel4 = document.getElementById("img_carousel4");
        let toprated_movies = fetchMovies("http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1", 4)
            .then((movies) => {
                Promise.all(movies).then(movie => {
                    img_carousel1.src = movie[1].image_url;
                    img_carousel1.onclick = () => {
                        let tr_modal = new Modal(movie[1]);
                        tr_modal.modal;
                        modal.style.display = "block";
                    };
                    img_carousel2.src = movie[2].image_url;
                    img_carousel2.onclick = () => {
                        let tr_modal = new Modal(movie[2]);
                        tr_modal.modal;
                        modal.style.display = "block";
                    };
                    img_carousel3.src = movie[3].image_url;
                    img_carousel3.onclick = () => {
                        let tr_modal = new Modal(movie[3]);
                        tr_modal.modal;
                        modal.style.display = "block";
                    };
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    bestMovieAllTime();
    bestSevenMovies();

});