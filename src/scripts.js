// IMPORTS
import './styles.css';
import {userAPI, ingredientAPI, recipeAPI} from './apiCalls';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

//API
let userIndex;
let currentUser;
let recipeList;
let recipeRepository;
let ingredientsData;
let userData;
let recipeData

Promise.all([userAPI, ingredientAPI, recipeAPI])
  .then(data => {
    console.log(data[0])
    userData = data[0].usersData;
    ingredientsData = data[1].ingredientsData;
    recipeData = data[2].recipeData
    userIndex = getRandomIndex(data[0].usersData);
    currentUser = new User(data[0].usersData[userIndex], data[1].ingredientsData);
    recipeList = data[2].recipeData.map(recipe => {
      return new Recipe(recipe);
    })
    recipeRepository = new RecipeRepository(recipeList)
    displayRecipes(recipeRepository.recipeData)
  }).catch(console.log('NO SOUP FOR YOU!'))

// GLOBAL VARIABLES
let recipeCards = [];
let favoriteButtons = [];
let selectedRecipe;

// QUERY SELECTORS
const recipeSection = document.querySelector('.recipes-section-js');
const selectedRecipeView = document.querySelector('.individual-recipe-container-js');
const filterSection = document.querySelector('.filter-section-js');
const mainView = document.querySelector('.main-view-container-js');
const searchRecipesButton = document.getElementById('searchRecipes');
const filterButton = document.getElementById('filterButton');
const homeButton = document.querySelector('.home-button');
const searchBar = document.getElementById('searchInput');
const filterTags = document.querySelectorAll('.tag');
const favoritePageButton = document.getElementById('favoritesPage');
const addToCookbookButton = document.querySelector('.cookbook-button-js');
const cookbookPageButton = document.querySelector('.cookbook-page-button.js');

// EVENT LISTENERS
searchRecipesButton.addEventListener('click', searchAllRecipes)
filterButton.addEventListener('click', filterAllRecipesByTag);
homeButton.addEventListener('click', displayHomePage);
favoritePageButton.addEventListener('click', displayFavorites);
addToCookbookButton.addEventListener('click', toggleCookbookButton);


// FUNCTIONS
// on click 'add to cookbook' button => 
// toggle button between add and remove from cookbook
  // if buttons value is not in cookbook -> 
  //add to user cookbook array, 
  //add css class to change button color,
  //change inner text of button to remove
//else 
  //remove from cookbook array
  // remove css class,
  //reset button inner text
function toggleCookbookButton() {
  if(addToCookbookButton.value === 'false') {
    addToCookbookButton.value === 'true';
    addToCookbookButton.classList.add('in-cookbook-state');
    currentUser.addToFavorites(selectedRecipe);
    addToCookbookButton.innerText = 'remove from cookbook';
  } else if(addToCookbookButton.value === 'true') {
    addToCookbookButton.value ==='false';
    addToCookbookButton.classList.remove('in-cookbook-state');
    currentUser.removeFromFavorites(selectedRecipe);
    addToCookbookButton.innerText = 'add to cookbook';
  }
}


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayHomePage() {
  displayRecipes(recipeRepository.recipeData)
  searchBar.value = '';
  // filterTags.value = '';
  hide([selectedRecipeView, homeButton]);
  show([mainView, recipeSection, searchBar, searchRecipesButton, favoritePageButton]);
}

function displayFavorites() {
  hide([favoritePageButton]);
  show([homeButton, filterSection, recipeSection, mainView]);
  displayRecipes(currentUser.favorites);
  recipeCards = document.querySelectorAll('.recipe-card-js');
  recipeCards.forEach(card => {
    const button = card.childNodes[3]
    button.value = 'favorited';
    button.classList.add('favorited-state');
  });
  console.log(currentUser.favorites)
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
  displayRecipes(recipeRepository.filterByTags(selectedTags));
}

function displayRecipes(recipes) {
  recipeSection.innerHTML = '';
  recipes.forEach(recipe => {
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
  console.log('e.target', e.target)
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

    show([selectedRecipeView, homeButton, favoritePageButton]);
    hide([mainView, searchBar, searchButton]);

    const recipeID = Number(e.target.parentNode.id.slice(2));
     selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
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
  const ingredientListSection = document.querySelector('.ingredient-list-section-js');

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
  elements.forEach(element => {
    element.classList.remove('hidden')
  });
}

function hide(elements) {
  elements.forEach(element => {
    element.classList.add('hidden')
  });
}
