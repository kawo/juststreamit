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

    function fetchBestMovie() {
        const url_best_movie = 'http://localhost:8000/api/v1/titles?sort_by=-imdb_score&page=1';
        const divID = document.getElementById('bm');
        const overlayTitle = document.getElementById('overlay_title')

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
                        let img = createNode('img');
                        img.src = movie.image_url;
                        let title = createNode('span');
                        title.innerHTML = movie.title
                        append(divID, img);
                        append(overlayTitle, title);
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