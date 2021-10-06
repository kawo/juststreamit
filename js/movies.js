import Modal from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");

    function apiPagination(number_of_movies) {
        let pages_number = 1;
        if (number_of_movies < 5) {
            return pages_number;
        };
        while (number_of_movies > 4) {
            pages_number++;
            number_of_movies = number_of_movies - 4;
        }
        return pages_number;
    };

    async function fetchMovies(url, number_of_movies = 1) {
        let movie_url;
        let pages_number = apiPagination(number_of_movies);
        var movie = [];
        var movies;
        if (number_of_movies < 5) {
            movies = fetch(url)
                .then((data) => data.json())
                .then((data) => {
                    for (var i = 0; i < number_of_movies; i++) {
                        movie_url = data.results[i].url;
                        movie.push(fetch(movie_url)
                            .then((data) => data.json())
                            .then(movie => {
                                return movie;
                            }));
                    };
                })
                .catch((error) => { console.log(error); });
        } else {
            while (pages_number != 0) {
                movies = await fetch(url)
                    .then((data) => data.json())
                    .then((data) => {
                        url = data.next;
                        for (var i = 0; i < 5; i++) {
                            movie_url = data.results[i].url;
                            movie.push(fetch(movie_url)
                                .then((data) => data.json())
                                .then(movie => {
                                    return movie;
                                }));
                        };
                    })
                    .catch((error) => { console.log(error); });
                pages_number = pages_number - 1;
            };
        };
        await movies;
        return movie;
    };

    function bestMovieAllTime() {
        let bm_title = document.getElementById("bm_title");
        let bm_desc = document.getElementById("bm_desc");
        let bm_img = document.getElementById("bm_img");
        let bm_button = document.getElementById("bm_button");
        let best_movie = fetchMovies("http://localhost:8000/api/v1/titles?country=USA&sort_by=-imdb_score&page=1")
            .then((movies) => {
                Promise.all(movies).then(movie => {
                    bm_title.innerHTML = movie[0].original_title;
                    bm_desc.innerHTML = movie[0].description;
                    bm_img.src = movie[0].image_url;
                    bm_button.onclick = () => {
                        let bm_modal = new Modal(movie[0]);
                        bm_modal.modal;
                        modal.style.display = "flex";
                    };
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    function topRatedMovies() {
        let img_carousel1 = document.getElementById("img_carousel1");
        let img_carousel2 = document.getElementById("img_carousel2");
        let img_carousel3 = document.getElementById("img_carousel3");
        let img_carousel4 = document.getElementById("img_carousel4");
        let toprated_movies = fetchMovies("http://localhost:8000/api/v1/titles?country=USA&sort_by=-imdb_score&page=1", 7)
            .then((movies) => {
                Promise.all(movies).then(movie => {
                    img_carousel1.src = movie[1].image_url;
                    img_carousel1.onclick = () => {
                        let tr_modal = new Modal(movie[1]);
                        tr_modal.modal;
                        modal.style.display = "flex";
                    };
                    img_carousel2.src = movie[2].image_url;
                    img_carousel2.onclick = () => {
                        let tr_modal = new Modal(movie[2]);
                        tr_modal.modal;
                        modal.style.display = "flex";
                    };
                    img_carousel3.src = movie[3].image_url;
                    img_carousel3.onclick = () => {
                        let tr_modal = new Modal(movie[3]);
                        tr_modal.modal;
                        modal.style.display = "flex";
                    };
                    img_carousel4.src = movie[4].image_url;
                    img_carousel4.onclick = () => {
                        let tr_modal = new Modal(movie[4]);
                        tr_modal.modal;
                        modal.style.display = "flex";
                    };
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    function topMovies(url, movies_number, element_id) {
        let elements = [];
        for (var i = 1; i < 5; i++) {
            elements.push(document.getElementById(element_id + i));
        }
        let api_url = fetchMovies(url, movies_number)
            .then((movies) => {
                Promise.all(movies).then(movie => {
                    elements[0].src = movie[0].image_url;
                    elements[0].onclick = () => {
                        let movie_modal = new Modal(movie[0]);
                        movie_modal.modal;
                        modal.style.display = "flex";
                    };
                    elements[1].src = movie[1].image_url;
                    elements[1].onclick = () => {
                        let movie_modal = new Modal(movie[1]);
                        movie_modal.modal;
                        modal.style.display = "flex";
                    };
                    elements[2].src = movie[2].image_url;
                    elements[2].onclick = () => {
                        let movie_modal = new Modal(movie[2]);
                        movie_modal.modal;
                        modal.style.display = "flex";
                    };
                    elements[3].src = movie[3].image_url;
                    elements[3].onclick = () => {
                        let movie_modal = new Modal(movie[3]);
                        movie_modal.modal;
                        modal.style.display = "flex";
                    };
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    bestMovieAllTime();
    topRatedMovies();
    topMovies("http://localhost:8000/api/v1/titles?genre=horror&country=USA&sort_by=-imdb_score", 7, "img_horror");
    topMovies("http://localhost:8000/api/v1/titles?genre=sci-fi&country=USA&sort_by=-imdb_score", 7, "img_scifi");
    topMovies("http://localhost:8000/api/v1/titles?genre=animation&country=USA&sort_by=-imdb_score", 7, "img_animation");

});