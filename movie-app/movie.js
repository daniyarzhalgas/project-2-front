const API_KEY = "36655d1fe758926fbf49cf314753c7b5";


url_movie_details = "https://api.themoviedb.org/3/movie/";
images_movie_url = "https://image.tmdb.org/t/p/original/"

//https://api.themoviedb.org/3/search/movie?api_key=36655d1fe758926fbf49cf314753c7b5&query=spider+man

function getDetailsInfo(movieId){
    fetch(url_movie_details +movieId + `?api_key=${API_KEY}`).then(res => res.json()).then(data => {
        console.log(url_movie_details +movieId + `?api_key=${API_KEY}`)
        console.log(data.title);
        document.title = data.title;

        
        document.querySelector(".header").style.background = `url(${images_movie_url}${data.backdrop_path})`;
        document.querySelector(".header").style.backgroundSize = 'cover';
        document.querySelector(".header").style.backgroundRepeat = 'no-repeat';
        document.querySelector(".header").style.backgroundPosition = 'center top';

        document.querySelector(".title").innerHTML = data.title;
        document.querySelector(".description").innerHTML = data.overview;
        document.querySelector(".duration").innerHTML = data.runtime;
        document.querySelector(".release_date").innerHTML = data.release_date;
        document.querySelector(".genre").innerHTML = data.genres[0].name;
        document.querySelector(".rating").innerHTML = data.vote_average;
        document.querySelector(".origin_country").innerHTML = data.origin_country[0]

        let storedMovies = JSON.parse(localStorage.getItem('movies'));
        console.log(storedMovies);
        if (storedMovies.includes(data.id.toString())) 
            document.querySelector(".favorite-img").src = "images/heart-liked.svg";
        else
            document.querySelector(".favorite-img").src ="images/heart-outline.svg"
        
    });



    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data);

        const actors_div = document.querySelector(".card-list");

        actors = data.cast;
        for(i = 0;i<actors.length;i++){
            let actor_card = document.createElement("div");
            actor_card.className = "card-item swiper-slide";
        
            actor_card.innerHTML =`
                <img src="${images_movie_url + actors[i].profile_path}" alt="User Image" class="user-image">
                <h1 id="movie-title">${actors[i].name}</h1>
                `
                actors_div.appendChild(actor_card);
            }
    });

    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`).then(res => res.json()).then(data => {
    
        document.querySelector(".footer").innerHTML =`
        <iframe width="800" height="525"
            src="https://www.youtube.com/embed/${data.results[0].key}">
        </iframe>
        `
    })
}




function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const movieId = getQueryParam('movie_id');

if (movieId) {
    console.log(`Movie ID: ${movieId}`);
    getDetailsInfo(movieId);
}

document.querySelector(".back-btn").addEventListener("click",()=>{
    window.history.back();
});
document.querySelector(".like-btn").addEventListener("click",()=>{
    if (document.querySelector(".favorite-img").src.endsWith("heart-outline.svg")) 
        document.querySelector(".favorite-img").src = "images/heart-liked.svg";
    else
        document.querySelector(".favorite-img").src ="images/heart-outline.svg"
    
    let storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (!Array.isArray(storedMovies)) {
        storedMovies = [];
    }
    const movieIndex = storedMovies.indexOf(movieId);
    
    if (movieIndex !== -1) {
        storedMovies.splice(movieIndex, 1);
        console.log(`${movieId} removed from the list`);
    } else {   
        storedMovies.push(movieId);
        console.log(`${movieId} added to the list`);
    }

    localStorage.setItem('movies', JSON.stringify(storedMovies));

})

const swiper = new Swiper('.slider-wrapper', {
    grabCursor: true,
    spaceBetween: 30,
    // Pagination bullets
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });