const API_KEY ="6df33510620f457ba00105a7bb2432c5";
const BASE_URL ="https://api.spoonacular.com/recipes/complexSearch?"
async function searchRecipes() {
    const searchQuery = document.querySelector("#search-form #query");

    fetch(`${BASE_URL}apiKey=${API_KEY}&query=${searchQuery.value}`)
    .then(res => res.json()).then(data => {
        console.log(data);

        const recipeList = document.querySelector("#results");

        if(data.results.length === 0){
            recipeList.innerHTML = "No recipes found.";
        }else{
            recipeList.innerHTML= "";
            data.results.forEach(recipe => {
                const recipeItem = document.createElement("div");
                recipeItem.className = "recipe-item";
                const recipeTitle = document.createElement("h3");
                recipeTitle.textContent = recipe.title;
                const recipeImage = document.createElement("img");
                recipeImage.src =recipe.image;
                recipeImage.alt= recipe.title;
                const recipeLink =document.createElement("a");
                recipeLink.href = `details.html?recipe_id=${recipe.id}`;
                recipeLink.textContent = "View Recipe";
                
                recipeItem.appendChild(recipeImage);
                recipeItem.appendChild(recipeTitle);
                recipeItem.appendChild(recipeLink);

                recipeList.appendChild(recipeItem); 
            });
        }
    });
    
}


document.querySelector("#query").addEventListener("keydown",(event)=> {
    if(event.key == 'Enter')   
        searchRecipes();
});