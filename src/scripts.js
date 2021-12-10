// GLOBAL
import './styles.css';
import apiCalls from './apiCalls';
import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';

import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

const recipeRepository = new RecipeRepository(recipeData);
console.log(recipeRepository)

// QUERY SELECTORS
var recipeSection = document.querySelector('.recipes-section');
// EVENT LISTENERS
window.addEventListener('load', displayAllRecipes);
console.log(recipeSection);

// FUNCTIONS
function displayAllRecipes() {
  recipeSection.innerHTML = '';
  recipeRepository.addAllRecipesToRecipesToShow();
  recipeRepository.recipesToShow.forEach(recipe => {
    recipeSection.innerHTML += `
      <section class='recipe-card'>
         <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
         <img class='favorite-button' src='../assets/heart.png' alt='favorite-button' class='favorite-button'>
         <p>${recipe.name}</p>
       </section>
     `;
  });
}

// <section class='recipe-card'>
//   <img src='' alt='' class='recipe-photo'>
//   <img src='' alt='favorite-button' class='favorite-button'>
//   <p>Recipe Name</p>
// </section>
