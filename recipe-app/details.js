const API_KEY ="6df33510620f457ba00105a7bb2432c5";

function getRecipeInfo(recipe_id){
    fetch(`https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=${API_KEY}&includeNutrition=true`)
    .then(res => res.json())
    .then(data=>{

        console.log(data);

        document.title = data.title;

        document.querySelector(".header").style.background = `url(${data.image})`;
        document.querySelector(".header").style.backgroundSize = 'cover';
        document.querySelector(".header").style.backgroundRepeat = 'no-repeat';
        document.querySelector(".header").style.backgroundPosition = 'center top';

        document.querySelector(".title").innerHTML = data.title;

        let ingredients_div = document.querySelector(".ingredients");
        ingredients = data.nutrition.ingredients;
        let len = ingredients.length > 5 ? 5 : ingredients.length; 

        for(i = 0; i<len;i++){
            let item_ingre = document.createElement('div')
            item_ingre.className = "col";
            item_ingre.innerHTML = `
                    <p>${ingredients[i].name}</p>
                    <p>Amount: ${ingredients[i].amount}</p>
                    <p>Unit: ${ingredients[i].unit}</p>
            `

            ingredients_div.appendChild(item_ingre);
        }

        let div = document.createElement("ol");        
        instructions = data.analyzedInstructions[0].steps;
        for(i=0;i < instructions.length;i++){
             let li = document.createElement("li");
            li.innerHTML = `
                ${instructions[i].step}
            `
            div.appendChild(li);
         }
        document.querySelector(".description").appendChild(div);

        document.querySelector(".duration").innerHTML = data.readyInMinutes +" minute";
        document.querySelector(".calories").innerHTML = data.nutrition.nutrients[0].amount;
        document.querySelector(".protein").innerHTML = data.nutrition.nutrients[10].amount;
        document.querySelector(".fat").innerHTML = data.nutrition.nutrients[1].amount;
        document.querySelector(".sugar").innerHTML = data.nutrition.nutrients[5].amount;

        let storedRecipes = JSON.parse(localStorage.getItem('recipes'));
        console.log(storedRecipes);
        if (storedRecipes && Array.isArray(storedRecipes) && storedRecipes.includes(data.id.toString())) {
            document.querySelector(".favorite-img").src = "images/heart-liked.svg";
        }else
            document.querySelector(".favorite-img").src ="images/heart-outline.svg"
    });
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const recipeId = getQueryParam('recipe_id');

if (recipeId) {
    console.log(`recipe ID: ${recipeId}`);
    getRecipeInfo(recipeId)
}


document.querySelector(".back-btn").addEventListener("click",()=>{
    window.history.back();
});
document.querySelector(".like-btn").addEventListener("click",()=>{
    if (document.querySelector(".favorite-img").src.endsWith("heart-outline.svg")) 
        document.querySelector(".favorite-img").src = "images/heart-liked.svg";
    else
        document.querySelector(".favorite-img").src ="images/heart-outline.svg"
    
    let storedRecipes = JSON.parse(localStorage.getItem('recipes'));

    if (!Array.isArray(storedRecipes)) {
        storedRecipes = [];
    }
    const recipeIndex = storedRecipes.indexOf(recipeId.toString());

    if (recipeIndex !== -1) {
        storedRecipes.splice(recipeIndex, 1);
        console.log(`${recipeId} removed from the list`);
    } else {   
        storedRecipes.push(recipeId);
        console.log(`${recipeId} added to the list`);
    }
    localStorage.setItem('recipe', JSON.stringify(storedRecipes));

})
