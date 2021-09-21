//Best movie
document.addEventListener('DOMContentLoaded', () => {

    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    function createMovieUrl(id) {
        url = 'http://localhost:8000/api/v1/titles/' + id;
        return url;
    }

    function parseList(list) {
        let result = "";
        if (list.length == 1) {
            result = list[0];
        } else {
            for (const item in list) {
                if (item == (list.length - 1)) {
                    result += list[item] + ".";
                } else {
                    result += list[item] + ", ";
                }
            }
        }
        return result;
    }

    function checkItem(item) {
        if (item == null) {
            return "Aucun résultat"
        }
    }

    function createModal(movie) {
        const modal_content = document.getElementById('modal_content');
        const modal_cover = document.getElementById('modal_cover');

        let modal_img = createNode('img');
        modal_img.src = movie.image_url;
        let modal_close = createNode('span');
        modal_close.className = 'close';
        modal_close.innerHTML = '&times;';
        let modal_title = createNode('h1');
        modal_title.className = 'modal_content';
        modal_title.innerHTML = movie.title;
        let modal_genre_title = createNode('h2');
        modal_genre_title.className = 'modal_content';
        modal_genre_title.innerHTML = "Genre : ";
        let modal_genre = createNode('p');
        modal_genre.className = 'modal_content';
        modal_genre.innerHTML = parseList(movie.genres);
        let modal_published_title = createNode('h2');
        modal_published_title.className = 'modal_content';
        modal_published_title.innerHTML = "Date de sortie : ";
        let modal_published = createNode('p');
        modal_published.className = 'modal_content';
        modal_published.innerHTML = movie.date_published;
        let modal_rated_title = createNode('h2');
        modal_rated_title.className = 'modal_content';
        modal_rated_title.innerHTML = "Audience : ";
        let modal_rated = createNode('p');
        modal_rated.className = 'modal_content';
        modal_rated.innerHTML = movie.rated;
        let modal_score_title = createNode('h2');
        modal_score_title.className = 'modal_content';
        modal_score_title.innerHTML = "Note IMDB : ";
        let modal_score = createNode('p');
        modal_score.className = 'modal_content';
        modal_score.innerHTML = movie.imdb_score;
        let modal_real_title = createNode('h2');
        modal_real_title.className = 'modal_content';
        modal_real_title.innerHTML = "Réalisateur(s) : ";
        let modal_real = createNode('p');
        modal_real.className = 'modal_content';
        modal_real.innerHTML = parseList(movie.directors);
        let modal_actors_title = createNode('h2');
        modal_actors_title.className = 'modal_content';
        modal_actors_title.innerHTML = "Acteurs : ";
        let modal_actors = createNode('p');
        modal_actors.className = 'modal_content';
        modal_actors.innerHTML = parseList(movie.actors);
        let modal_duration_title = createNode('h2');
        modal_duration_title.className = 'modal_content';
        modal_duration_title.innerHTML = "Durée : ";
        let modal_duration = createNode('p');
        modal_duration.className = 'modal_content';
        modal_duration.innerHTML = movie.duration + " minutes";
        let modal_countries_title = createNode('h2');
        modal_countries_title.className = 'modal_content';
        modal_countries_title.innerHTML = "Pays : ";
        let modal_countries = createNode('p');
        modal_countries.className = 'modal_content';
        modal_countries.innerHTML = parseList(movie.countries);
        let modal_boxoffice_title = createNode('h2');
        modal_boxoffice_title.className = 'modal_content';
        modal_boxoffice_title.innerHTML = "Box office : ";
        let modal_boxoffice = createNode('p');
        modal_boxoffice.className = 'modal_content';
        modal_boxoffice.innerHTML = checkItem(movie.worldwide_gross_income);
        let modal_resume_title = createNode('h2');
        modal_resume_title.className = 'modal_content';
        modal_resume_title.innerHTML = "Résumé : ";
        let modal_resume = createNode('p');
        modal_resume.className = 'modal_content';
        modal_resume.innerHTML = movie.long_description;

        append(modal_cover, modal_img);
        append(modal_content, modal_close);
        append(modal_content, modal_title);
        append(modal_content, modal_genre_title);
        append(modal_content, modal_genre);
        append(modal_content, modal_published_title);
        append(modal_content, modal_published);
        append(modal_content, modal_rated_title);
        append(modal_content, modal_rated);
        append(modal_content, modal_score_title);
        append(modal_content, modal_score);
        append(modal_content, modal_real_title);
        append(modal_content, modal_real);
        append(modal_content, modal_actors_title);
        append(modal_content, modal_actors);
        append(modal_content, modal_duration_title);
        append(modal_content, modal_duration);
        append(modal_content, modal_countries_title);
        append(modal_content, modal_countries);
        append(modal_content, modal_boxoffice_title);
        append(modal_content, modal_boxoffice);
        append(modal_content, modal_resume_title);
        append(modal_content, modal_resume);

        modal_close.onclick = function() {
            modal.style.display = "none";
        }

    }

    function fetchBestMovie() {
        const url_best_movie = 'http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1';
        const bmImg = document.getElementById('bm_img');
        const bmDesc = document.getElementById('bm_desc');
        const modal = document.getElementById('modal');
        const modal_content = document.getElementById('modal_content');

        fetch(url_best_movie)
            .then((response) => response.json())
            .then(function(data) {
                let movie_id = data.results[0].id;
                movie_url = createMovieUrl(movie_id);
                fetch(movie_url)
                    .then((response) => response.json())
                    .then(function(data) {
                        let movie = data;
                        console.log(movie);
                        let title = createNode('h1');
                        title.innerHTML = movie.title;
                        let description = createNode('p');
                        description.style = 'font-size:12px';
                        description.innerHTML = movie.description;
                        let img = createNode('img');
                        img.style = 'vertical-align:middle';
                        img.src = movie.image_url;
                        let modal_button = createNode('button');
                        modal_button.className = 'best_movie_desc';
                        modal_button.innerHTML = 'Détails';
                        createModal(movie);
                        modal_button.onclick = function() {
                            modal.style.display = "block";
                        }
                        window.onclick = function(event) {
                            if (event.target == modal_content) {
                                modal.style.display = "none";
                            }
                        }
                        append(bmDesc, title);
                        append(bmDesc, description);
                        append(bmImg, img);
                        append(bmDesc, modal_button);
                    })
                    .catch(function(error) {
                        console.log(error)
                    })

            })
            .catch(function(error) {
                console.log(error);
            })
    }

    fetchBestMovie();

});