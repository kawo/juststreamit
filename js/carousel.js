document.addEventListener("DOMContentLoaded", () => {

    function carousel(element_class_name, button_next, button_prev) {
        let slide_next = document.getElementById(button_next);
        let slide_prev = document.getElementById(button_prev);
        let movies = document.getElementsByClassName(element_class_name);
        let movies_page = Math.ceil(movies.length / 4);
        let index = 0;
        let slide_each = 25;
        let slide_max = 75;

        let move_next = () => {
            index = index + slide_each;
            if (movies == 1) {
                index = 0;
            };
            for (const movie of movies) {
                if (index > slide_max) {
                    index = index - slide_each;
                };
                movie.style.left = "-" + index + "%";
            };
        };

        let move_prev = () => {
            index = index - slide_each;
            if (index <= 0) {
                index = 0;
            };
            for (const movie of movies) {
                if (movies_page > 1) {
                    movie.style.left = "-" + index + "%";
                };
            };
        };

        slide_next.onclick = () => {
            move_next();
        };

        slide_prev.onclick = () => {
            move_prev();
        };

    };

    carousel("top_rated_carousel", "top_rated_next", "top_rated_prev");
    carousel("top_horror_carousel", "top_horror_next", "top_horror_prev");
    carousel("top_scifi_carousel", "top_scifi_next", "top_scifi_prev");
    carousel("top_animation_carousel", "top_animation_next", "top_animation_prev");
});
