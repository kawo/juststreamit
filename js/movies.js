import Modal from './modal.js';

document.addEventListener("DOMContentLoaded", () => {

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    function createMovieUrl(id) {
        var url = "http://localhost:8000/api/v1/titles/" + id;
        return url;
    }

    function fetchBestMovie() {
        var url_best_movie =
            "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1";
        var bmImg = document.getElementById("bm_img");
        var bmDesc = document.getElementById("bm_desc");
        const modal = document.getElementById("modal");
        const modal_content = document.getElementById("modal_content");

        fetch(url_best_movie)
            .then((response) => response.json())
            .then(function(data) {
                console.log(data);
                let movie_id = data.results[0].id;
                console.log(movie_id);
                let movie_url = createMovieUrl(movie_id);
                fetch(movie_url)
                    .then((response) => response.json())
                    .then(function(data) {
                        let best_movie = data;
                        console.log(best_movie);
                        let title = createNode("h1");
                        title.innerHTML = best_movie.title;
                        let description = createNode("p");
                        description.style = "font-size:12px";
                        description.innerHTML = best_movie.description;
                        let img = createNode("img");
                        img.style = "vertical-align:middle";
                        img.src = best_movie.image_url;
                        let modal_button = createNode("button");
                        modal_button.className = "best_movie_button";
                        modal_button.innerHTML = "Détails";
                        modal_button.onclick = function() {
                            var bmModal = new Modal(best_movie);
                            bmModal.modal;
                            modal.style.display = "block";
                        };
                        append(bmDesc, title);
                        append(bmDesc, description);
                        append(bmImg, img);
                        append(bmDesc, modal_button);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    // Show 7 Best Movies
    function fetchSevenBestMovies() {
        var url_best_movies =
            "http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1";
        var carousel1 = document.getElementById("tr_carousel1");
        var carousel2 = document.getElementById("tr_carousel2");
        var carousel3 = document.getElementById("tr_carousel3");
        var carousel4 = document.getElementById("tr_carousel4");
        const modal = document.getElementById("modal");
        const modal_content = document.getElementById("modal_content");

        fetch(url_best_movies)
            .then((response) => response.json())
            .then(function(data) {
                let movie_id = data.results[1].id;
                let movie_url = createMovieUrl(movie_id);
                fetch(movie_url)
                    .then((response) => response.json())
                    .then(function(data) {
                        let tr_movie = data;
                        console.log(tr_movie);
                        let title = createNode("h1");
                        title.innerHTML = tr_movie.title;
                        let img = createNode("img");
                        img.src = tr_movie.image_url;
                        let modal_button = createNode("button");
                        modal_button.className = "best_movie_button";
                        modal_button.innerHTML = "Détails";
                        modal_button.onclick = function() {
                            var trModal = new Modal(tr_movie);
                            trModal.modal;
                            modal.style.display = "block";
                        };
                        window.onclick = function(event) {
                            if (event.target == modal_content) {
                                modal.style.display = "none";
                            }
                        };
                        append(carousel1, img);
                        append(carousel1, modal_button);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    fetchBestMovie();
    //fetchSevenBestMovies();
});