const API_KEY ="6df33510620f457ba00105a7bb2432c5";


const recipe_list_div = document.querySelector(".recipe-list");
function displayFavoriteReciptes(){
    let favoriteRecipes = JSON.parse(localStorage.getItem('recipe'));

    if(favoriteRecipes.length == 0){
        let recipe_card = document.createElement("div");
        recipe_card.innerHTML = `
                <div class="recipe-card">
                    Favirite recipes empty
                </div>
                `;
        recipe_list_div.appendChild(recipe_card);
    }else{   
        for(i = 0; i< favoriteRecipes.length;i++){
            fetch(`https://api.spoonacular.com/recipes/${favoriteRecipes[i]}/information?apiKey=${API_KEY}&includeNutrition=true`)
            .then(res => res.json()).then(data => {

                let recipe_card = document.createElement("div");
                console.log(data);

                recipe_card.innerHTML = `
                <div class="recipe-card">
                    <img src="${data.image}" class="poster-img">
                    <div class="recipe-desc">
                        <h3>${data.title}</h3>
                        <hr>
                        <p>${data.summary}</p>
                    </div>
                </div>
                `;

                recipe_card.addEventListener('click', function() {
                    window.location.href = `details.html?recipe_id=${data.id}`;
            });
                recipe_list_div.appendChild(recipe_card);
            })
        }
    }
}


displayFavoriteReciptes();

document.querySelector(".back-btn").addEventListener("click",()=>{
    window.history.back();
});