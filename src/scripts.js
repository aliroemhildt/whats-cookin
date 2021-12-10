// GLOBAL
import './styles.css';
import apiCalls from './apiCalls';
import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';

import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

const recipeRepository = new RecipeRepository(recipeData);


//

// QUERY SELECTORS
const recipeSection = document.querySelector('.recipes-section');
let recipeCards


// EVENT LISTENERS
window.addEventListener('load', displayAllRecipes);

recipeCards.forEach((card) => {
  card.addEventListener('click', displaySelectedRecipe)
});


// FUNCTIONS
function displayRecipes() {
  recipeSection.innerHTML = '';  recipeRepository.recipesToShow.forEach(recipe => {
    recipeSection.innerHTML += `
      <section class='recipe-card'>
         <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
         <button class='favorite-button'>FAVORITE</button>
         <p class='recipe-card-name'>${recipe.name}</p>
       </section>
     `;
  });
  recipeCards = document.querySelectorAll('.recipe-card');
  recipeCards.forEach((card) => {
    card.addEventListener('click', displaySelectedRecipe)
  });
};

function displayAllRecipes() {
  recipeRepository.addAllRecipesToRecipesToShow();
  displayRecipes();
};

function displaySelectedRecipe() {
  console.log('hey there')
};

//need a funtion that will display ONLY the recipe that's clicked on
//1. click a recipe CARD
//2. hide the filter section (class="filter-section") and hide main recipe section (class="recipes-section")
//3. remove hidden from class="individual-recipe-container hidden"
//4. change the inner text of all the properties:
// - the src of the recipe image
// - the recipe title
// - the ingredients List
// - the total Cost
// - the instructions (<p></p>)
// call our method we wrote




// <section class='recipe-card'>
//   <img src='' alt='' class='recipe-photo'>
//   <img src='' alt='favorite-button' class='favorite-button'>
//   <p>Recipe Name</p>
// </section>
