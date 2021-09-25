export default class createModal {

    constructor(movie) {
        this.movie = movie;
        console.log(this.movie);
    }

    get modal() {
        return this.buildModal();
    }

    parseList(list) {
        let result = "";
        if (list.length == 1) {
            result = list[0];
        } else {
            for (const item in list) {
                if (item == list.length - 1) {
                    result += list[item] + ".";
                } else {
                    result += list[item] + ", ";
                }
            }
        }
        return result;
    }

    checkItem(item) {
        if (item == null) {
            return "Aucun résultat";
        }
    }

    delModal(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.innerHTML = "";
        }
    }

    buildModal() {

        let modal_content = document.getElementById("modal_content");
        let modal_cover = document.getElementById("modal_cover");

        let modal_cover_img = document.getElementById("modal_cover_img");
        let modal_close = document.getElementById("close");
        let modal_title = document.getElementById("modal_title");
        let modal_genre_title = document.getElementById("modal_genre_title");
        let modal_genre = document.getElementById("modal_genre");
        let modal_published_title = document.getElementById("modal_published_title");
        let modal_published = document.getElementById("modal_published");
        let modal_rated_title = document.getElementById("modal_rated_title");
        let modal_rated = document.getElementById("modal_rated");
        let modal_score_title = document.getElementById("modal_score_title");
        let modal_score = document.getElementById("modal_score");
        let modal_real_title = document.getElementById("modal_real_title");
        let modal_real = document.getElementById("modal_real");
        let modal_actors_title = document.getElementById("modal_actors_title");
        let modal_actors = document.getElementById("modal_actors");
        let modal_duration_title = document.getElementById("modal_duration_title");
        let modal_duration = document.getElementById("modal_duration");
        let modal_countries_title = document.getElementById("modal_countries_title");
        let modal_countries = document.getElementById("modal_countries");
        let modal_boxoffice_title = document.getElementById("modal_boxoffice_title");
        let modal_boxoffice = document.getElementById("modal_boxoffice");
        let modal_description_title = document.getElementById("modal_description_title");
        let modal_description = document.getElementById("modal_description");

        modal_cover_img.src = this.movie.image_url;

        modal_title.innerHTML = this.movie.title;
        modal_genre_title.innerHTML = "Genre : ";
        modal_genre.innerHTML = this.parseList(this.movie.genres);
        modal_published_title.innerHTML = "Date de sortie : ";
        modal_published.innerHTML = this.movie.date_published;
        modal_rated_title.innerHTML = "Audience : ";
        modal_rated.innerHTML = this.movie.rated;
        modal_score_title.innerHTML = "Note IMDB : ";
        modal_score.innerHTML = this.movie.imdb_score;
        modal_real_title.innerHTML = "Réalisateur(s) : ";
        modal_real.innerHTML = this.parseList(this.movie.directors);
        modal_actors_title.innerHTML = "Acteurs : ";
        modal_actors.innerHTML = this.parseList(this.movie.actors);
        modal_duration_title.innerHTML = "Durée : ";
        modal_duration.innerHTML = this.movie.duration + " minutes";
        modal_countries_title.innerHTML = "Pays : ";
        modal_countries.innerHTML = this.parseList(this.movie.countries);
        modal_boxoffice_title.innerHTML = "Box office : ";
        modal_boxoffice.innerHTML = this.checkItem(this.movie.worldwide_gross_income);
        modal_description_title.innerHTML = "Résumé : ";
        modal_description.innerHTML = this.movie.long_description;

        modal_close.onclick = () => {
            modal.style.display = "none";
            modal_cover_img.src = "";
            const content_nodes = modal_content.querySelectorAll('[id^="modal_"]');
            this.delModal(content_nodes);

        };

        modal_content.onclick = () => {
            modal.style.display = "none";
            modal_cover_img.src = "";
            const content_nodes = modal_content.querySelectorAll('[id^="modal_"]');
            this.delModal(content_nodes);
        };

        modal_cover.onclick = () => {
            modal.style.display = "none";
            modal_cover_img.src = "";
            const content_nodes = modal_content.querySelectorAll('[id^="modal_"]');
            this.delModal(content_nodes);
        };
    };
};