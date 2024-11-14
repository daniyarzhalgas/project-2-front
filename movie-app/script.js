const API_KEY = "36655d1fe758926fbf49cf314753c7b5";

const url_popular = "https://api.themoviedb.org/3/movie/popular?" + `api_key=${API_KEY}`
const url_top_rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
const url_uncoming_movies_ = "https://api.themoviedb.org/3/movie/upcoming?api_key=" +API_KEY;
const images_movie_url = "https://image.tmdb.org/t/p/original/"

const movies = document.querySelectorAll(".card-list");


function displayListMovies(url, index){
    fetch(url).then(res => res.json()).then(data => {
      console.log(data);
      movies[index].innerHTML = "";
      movies_list = data.results
      
      if(movies_list.length == 0) {
        console.log("sadfasd");
        document.querySelector(".results").innerHTML = `<h1>No such movies</h1>`;
      }
      for(i = 0;i<movies_list.length;i++){
        color_rating = "";
        if(movies_list[i].vote_average >= 7) color_rating="green";
        else if(movies_list[i].vote_average >=5) color_rating="yellow";
        else color_rating="red";  

          let movie_card = document.createElement("div");
          movie_card.className = "card-item swiper-slide";
          movie_card.dataset.movie_id = movies_list[i].id;
          movie_card.innerHTML =`
              <div style="position: relative;">
                <img src="${images_movie_url + movies_list[i].poster_path}" alt="Movie Image" class="movie-image">
                <span class="rating" style="background: ${color_rating};">${movies_list[i].vote_average}</span>
              </div>
              <h1 id="movie-title">${movies_list[i].title}</h1>
              <p>${movies_list[i].release_date}</p>`
              
          movie_card.addEventListener('click', function() {
                movieId = this.dataset.movie_id;
                window.location.href = `movie.html?movie_id=${movieId}`;
          });
          movies[index].appendChild(movie_card);
      }
  });
}

displayListMovies(url_popular,1);
displayListMovies(url_top_rated,2);
displayListMovies(url_uncoming_movies_,3);

document.getElementById("sort-options").addEventListener("change", () => {
  sortBy = document.getElementById("sort-options").value;
  console.log(sortBy);
  displayListMovies(`${url_popular}&sort_by=${sortBy}`,1);
  displayListMovies(`${url_top_rated}&sort_by=${sortBy}`,2);
  displayListMovies(`${url_uncoming_movies_}&sort_by=${sortBy}`,3); 
});


document.querySelector(".search button").addEventListener("click",()=>{
  let searchQuery = document.querySelector(".search input").value;
  
  displayListMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`,0);
    let div_res = document.querySelector(".results");
    div_res.style.display ="block";


      document.querySelectorAll(".movies-list").forEach(movie => {
        movie.style.display = "none";
      });
});
document.querySelector(".search input").addEventListener("keydown", (event) => {
  if(event.key =="Enter"){
    document.querySelector(".search button").click();
  }
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