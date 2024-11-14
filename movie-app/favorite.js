const API_KEY = "36655d1fe758926fbf49cf314753c7b5";


url_movie_details = "https://api.themoviedb.org/3/movie/";
images_movie_url = "https://image.tmdb.org/t/p/original/"
const movie_list_div = document.querySelector(".movie-list");
function displayFavoriteMovies(){
    let favoriteMovies = JSON.parse(localStorage.getItem('movies'));

    if(favoriteMovies.length == 0){
        let movie_card = document.createElement("div");
        movie_card.innerHTML = `
                <div class="movie-card">
                    Favirite movies empty
                </div>
                `;
        movie_list_div.appendChild(movie_card);
    }else{        
        for(i = 0; i< favoriteMovies.length;i++){
            fetch(url_movie_details + favoriteMovies[i] + `?api_key=${API_KEY}`).then(res => res.json()).then(data => {
                let movie_card = document.createElement("div");
                console.log(data)
                genres ="";
                for(i = 0 ; i<data.genres.length ; i++){
                    genres += data.genres[i].name + ", ";
                }
                movie_card.innerHTML = `
                <div class="movie-card">
                    <img src="${images_movie_url}${data.poster_path}" class="poster-img">
                    <div class="movie-desc">
                        <h3>${data.title}</h3>
                        <span>Release date: ${data.release_date}</span>
                        <p>Genres: ${genres}</p>
                        <p>${data.overview}</p>
                    </div>
                </div>
                `;

                movie_card.addEventListener('click', function() {
                    window.location.href = `movie.html?movie_id=${data.id}`;
            });
                movie_list_div.appendChild(movie_card);
            })
        }
    }    
}


displayFavoriteMovies();

document.querySelector(".back-btn").addEventListener("click",()=>{
    window.history.back();
});