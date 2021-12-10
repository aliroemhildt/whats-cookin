// GLOBAL
import './styles.css';
import apiCalls from './apiCalls';
import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';

import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

const recipeRepository = new RecipeRepository(recipeData);

// QUERY SELECTORS
const recipeSection = query.selector("recipes-section");

// EVENT LISTENERS
recipeSection.addEventListener('load', displayAllRecipes());

// FUNCTIONS
const displayAllRecipes = () => {
  // iterate through recipeRepository:
  //
}

// <section class='recipe-card'>
//   <img src="" alt="" class="recipe-photo">
//   <img src="" alt="favorite-button" class="favorite-button">
//   <p>Recipe Name</p>
// </section>
