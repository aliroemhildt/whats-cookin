// IMPORTS
import './styles.css';
import apiCalls from './apiCalls';
import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';
import userData from '../src/data/users';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

// GLOBAL VARIABLES
const recipeList = recipeData.map(recipe => {
  return new Recipe(recipe);
});
const userIndex = getRandomIndex(userData);
const currentUser = new User(userData[userIndex], ingredientsData);
const recipeRepository = new RecipeRepository(recipeList);
let recipeCards = [];
let favoriteButtons = [];

// QUERY SELECTORS
const recipeSection = document.querySelector('.recipes-section-js');
const selectedRecipeView = document.querySelector('.individual-recipe-container-js');
const filterBar = document.querySelector('.filter-section-js');
const mainView = document.querySelector('.main-view-container-js');
const searchRecipesButton = document.getElementById('searchRecipes');
const filterButton = document.getElementById('filterButton');
const homeButton = document.querySelector('.home-button');
const searchBar = document.getElementById('searchInput');
const favoritePageButton = document.getElementById('favoriteRecipePageButton');
const filterTags = document.querySelectorAll('.tag');



// EVENT LISTENERS
window.addEventListener('load', displayAllRecipes);

searchRecipesButton.addEventListener('click', searchAllRecipes)

filterButton.addEventListener('click', filterAllRecipesByTag);
homeButton.addEventListener('click', displayHomePage);


// FUNCTIONS
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayHomePage() {
  displayAllRecipes();
  searchBar.value = '';
  // filterTags.value = '';
  hide([selectedRecipeView, homeButton]);
  show([mainView, recipeSection, searchBar, searchRecipesButton]);
}

function displayFavorites() {
  hide([favoritePageButton, mainView, recipeSection]);
  show([homeButton]);
  //need other functions to be built out in order to finish this
}

function filterAllRecipesByTag() {
  const selectedTags = [];
  filterTags.forEach((tag) => {
    if (tag.checked) {
      selectedTags.push(tag.id)
    }
  })
  if (selectedTags.length === 0) {
    return;
  }
  recipeRepository.recipesToShow = recipeRepository.filterByTags(selectedTags);
  displayRecipes();
}

function displayRecipes() {
  recipeSection.innerHTML = '';
  recipeRepository.recipesToShow.forEach(recipe => {
    recipeSection.innerHTML += `
      <section class='recipe-card recipe-card-js' id='id${recipe.id}'>
         <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
         <button class='favorite-button favorite-button-js' value='unfavorited'>favorite</button>
         <p class='recipe-card-name'>${recipe.name}</p>
       </section>
     `;
  });
  recipeCards = document.querySelectorAll('.recipe-card-js');
  recipeCards.forEach((card) => {
    card.addEventListener('click', function(e) {
      displaySelectedRecipe(e)
    });
  });
  favoriteButtons = document.querySelectorAll('.favorite-button-js');
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      toggleFavoriteButton(e)
    })
  });
}

function toggleFavoriteButton(e) {
  if (e.target.classList.contains('favorite-button-js')) {
    const recipeID = Number(e.target.parentNode.id.slice(2));
    const recipe = recipeRepository.recipeData.find((element) => {
      return element.id === recipeID;
    });
    if (e.target.value === 'unfavorited') {
      e.target.value = 'favorited';
      e.target.classList.add('favorited-state');
      currentUser.addToFavorites(recipe);
    } else if (e.target.value === 'favorited') {
      e.target.value = 'unfavorited';
      e.target.classList.remove('favorited-state');
      currentUser.removeFromFavorites(recipe);
    }
  }
}

function searchAllRecipes() {
  const searchName = document.getElementById('searchInput').value;
  recipeRepository.filterByNameOrIng(searchName, ingredientsData);
  displayRecipes();
}

function displayAllRecipes() {
  recipeRepository.addAllRecipesToRecipesToShow();
  displayRecipes();
}

function displaySelectedRecipe(e) {
  if (!e.target.classList.contains('favorite-button-js')) {
    const image = document.querySelector('.selected-recipe-photo-js');
    const name = document.querySelector('.selected-recipe-name-js');
    const cost = document.querySelector('.cost-js');
    const instructionsSection = document.querySelector('.instructions-section-js');
    const ingredientListSection = document.querySelector('.ingredient-list-section-js');
    const searchButton = document.getElementById('searchRecipes');

    show([selectedRecipeView, homeButton]);
    hide([mainView, searchBar, searchButton]);

    const recipeID = Number(e.target.parentNode.id.slice(2));
    const selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
      return currentRecipe.id === recipeID;
    });
    const ingredientListElement = getIngredientListElement(e, selectedRecipe);

    const instructionsElement = getInstructionsElement(e, selectedRecipe);

    const costNum = selectedRecipe.calculateRecipeCostInDollars(ingredientsData);

    ingredientListSection.innerHTML += ingredientListElement;
    instructionsSection.innerHTML += instructionsElement
    image.src = selectedRecipe.image;
    name.innerText = selectedRecipe.name;
    cost.innerText = `$${costNum}`;
  }
}

function getIngredientListElement(e, selectedRecipe) {
  const ingredientListSection = document.querySelector('.ingredient-list-section-js')

  ingredientListSection.innerHTML = '<h3>ingredients</h3>';

  const ingredientNames = selectedRecipe.determineRecipeIngredients(ingredientsData);

  const ingredientListText = selectedRecipe.ingredients.reduce((acc, ingredient, index) => {
    acc += `${ingredientNames[index]}: ${ingredient.quantity.amount.toString()} ${ingredient.quantity.unit}<br><br>`;
    return acc;
  }, '');

  return '<p class="selected-recipe-ingredients-list">' + ingredientListText + '</p>';
}

function getInstructionsElement(e, selectedRecipe) {
  const instructionsSection = document.querySelector('.instructions-section-js');

  instructionsSection.innerHTML = '<h3>instructions</h3>'

  const instructionsStrings = selectedRecipe.returnInstructions();

  const instructionsText = instructionsStrings.reduce((acc, instruction) => {
    acc += `${instruction}<br><br>`;
    return acc;
  }, '');

  return '<p class="selected-recipe-instructions">' + instructionsText + '</p>'
}

function show(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  }
}

function hide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  }
}

// boilerplate html for each recipe card:
// <section class='recipe-card'>
//   <img src='' alt='' class='recipe-photo'>
//   <img src='' alt='favorite-button' class='favorite-button'>
//   <p>Recipe Name</p>
// </section>
