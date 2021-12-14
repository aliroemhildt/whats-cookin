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

Promise.all([userAPI, ingredientAPI, recipeAPI])
  .then(data => {
    ingredientsData = data[1].ingredientsData;
    userIndex = getRandomIndex(data[0].usersData);
    currentUser = new User(data[0].usersData[userIndex], data[1].ingredientsData);
    recipeList = data[2].recipeData.map(recipe => {
      return new Recipe(recipe);
    })
    recipeRepository = new RecipeRepository(recipeList)
    displayRecipes(recipeRepository.recipeData)
  }).catch(error => console.log(error));

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
const addToCookbookButton = document.querySelector('.cookbook-button-js')
const cookbookPageButton = document.querySelector('.cookbook-page-button-js');
const singleViewFavoriteButton = document.querySelector('.single-view-favorite-button-js');

// EVENT LISTENERS
searchRecipesButton.addEventListener('click', () => {
  searchAllRecipes(recipeRepository.recipeData);
});
filterButton.addEventListener('click', () => {
  filterRecipesByTag(recipeRepository.recipeData);
});
homeButton.addEventListener('click', displayHomePage);
favoritePageButton.addEventListener('click', displayFavorites);
addToCookbookButton.addEventListener('click', toggleCookbookButton);
cookbookPageButton.addEventListener('click', displayCookbook);
singleViewFavoriteButton.addEventListener('click', favoriteFromSingleRecipeView);

// FUNCTIONS
function displayFavorites() {
  hide([favoritePageButton]);
  show([homeButton, filterSection, recipeSection, mainView, cookbookPageButton]);
  filterButton.addEventListener('click', () => {
    filterRecipesByTag(currentUser.favorites)
  });
  searchRecipesButton.addEventListener('click', () => {
    searchAllRecipes(currentUser.favorites)
  });
  displayRecipes(currentUser.favorites);
  favoriteButtons = document.querySelectorAll('.favorite-button-js');
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', removeFromPage);
  })
}

function removeFromPage() {
  currentUser.removeFromFavorites();
  displayFavorites();
}

function toggleFavoriteButton(e) {
  if (e.target.classList.contains('favorite-button-js')) {
    const recipeID = Number(e.target.closest('section').id.slice(2));
    const recipe = recipeRepository.recipeData.find((element) => {
      return element.id === recipeID;
    });
    if (e.target.value === 'unfavorited') {
      selectFavoriteButton(e);
      currentUser.addToFavorites(recipe);
    } else if (e.target.value === 'favorited') {
      deselectFavoriteButton(e);
      currentUser.removeFromFavorites(recipe);
    }
  }
}

function selectFavoriteButton(e) {
  e.target.value = 'favorited';
  e.target.classList.add('favorited-state');
}

function deselectFavoriteButton(e) {
  e.target.value = 'unfavorited';
  e.target.classList.remove('favorited-state');
}

function favoriteFromSingleRecipeView() {
  if (currentUser.favorites.includes(selectedRecipe)) {
    singleViewFavoriteButton.value = 'unfavorited';
    singleViewFavoriteButton.classList.remove('favorited-state');
    currentUser.removeFromFavorites(selectedRecipe);
  } else {
    singleViewFavoriteButton.value = 'unfavorited';
    singleViewFavoriteButton.classList.add('favorited-state');
    currentUser.addToFavorites(selectedRecipe);
  }
}

function displayCookbook() {
  hide([addToCookbookButton, selectedRecipeView, cookbookPageButton]);
  show([homeButton, filterSection, mainView, recipeSection, favoritePageButton, addToCookbookButton]);
  filterButton.addEventListener('click', () => {
    filterRecipesByTag(currentUser.recipesToCook);
  });
  searchRecipesButton.addEventListener('click', () => {
    searchAllRecipes(currentUser.recipesToCook);
  });
  displayRecipes(currentUser.recipesToCook);
}

function toggleCookbookButton() {
  if (addToCookbookButton.value === 'false') {
    selectAddToCookbookButton();
    currentUser.addToRecipesToCook(selectedRecipe);
    addToCookbookButton.innerText = 'remove from cookbook';
  } else if (addToCookbookButton.value === 'true') {
    deselectAddToCookbookButton();
    currentUser.removeFromRecipesToCook(selectedRecipe);
    addToCookbookButton.innerText = 'add to cookbook';
  }
}

function selectAddToCookbookButton() {
  addToCookbookButton.value = 'true';
  addToCookbookButton.classList.add('in-cookbook-state');
}

function deselectAddToCookbookButton() {
  addToCookbookButton.value = 'false';
  addToCookbookButton.classList.remove('in-cookbook-state');
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayHomePage() {
  displayRecipes(recipeRepository.recipeData);
  searchBar.value = '';
  hide([selectedRecipeView, homeButton]);
  show([mainView, recipeSection, searchBar, searchRecipesButton, favoritePageButton, cookbookPageButton]);
  filterButton.addEventListener('click', () => {
    filterRecipesByTag(recipeRepository.recipeData);
  })
  searchRecipesButton.addEventListener('click', () => {
    searchAllRecipes(recipeRepository.recipeData);
  })
}

function filterRecipesByTag(recipes) {
  const selectedTags = [];
  filterTags.forEach((tag) => {
    if (tag.checked) {
      selectedTags.push(tag.id);
    }
  })

  if (selectedTags.length !== 0) {
    recipeRepository.filterByTags(selectedTags, recipes);
    displayRecipes(recipeRepository.recipesToShow);
  } else {
    displayRecipes(recipes);
  }
}

function displayRecipes(recipes) {
  recipeSection.innerHTML = '';
  recipes.forEach(recipe => {
    recipeSection.innerHTML += `
      <section class='recipe-card recipe-card-js' id='id${recipe.id}'>
         <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
         <div class='recipe-card-text'>
           <button class='favorite-button favorite-button-js' value='unfavorited'>favorite</button>
           <p class='recipe-card-name'>${recipe.name}</p>
          </div>
       </section>
     `;
  })

  recipeCards = document.querySelectorAll('.recipe-card-js');
  recipeCards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
      displaySelectedRecipe(e);
    })
  })

  favoriteButtons = document.querySelectorAll('.favorite-button-js');
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      toggleFavoriteButton(e);
    })
  })

  recipeCards = document.querySelectorAll('.recipe-card-js');
  recipeCards.forEach(card => {
    const cardId = Number(card.id.slice(2));
    const currentRecipe = recipeRepository.recipeData.find(recipe => {
      return recipe.id === cardId;
    })
    const button = card.childNodes[3].childNodes[1];
    if (currentUser.favorites.includes(currentRecipe)) {
      button.value = 'favorited';
      button.classList.add('favorited-state');
    }
  })
}

function searchAllRecipes(recipes) {
  const searchName = document.getElementById('searchInput').value;
  recipeRepository.filterByNameOrIng(searchName, ingredientsData, recipes);
  displayRecipes(recipeRepository.recipesToShow);
}

function displaySelectedRecipe(e) {
  if (!e.target.classList.contains('favorite-button-js')) {

    const image = document.querySelector('.selected-recipe-photo-js');
    const name = document.querySelector('.selected-recipe-name-js');
    const cost = document.querySelector('.cost-js');
    const instructionsSection = document.querySelector('.instructions-section-js');
    const ingredientListSection = document.querySelector('.ingredient-list-section-js');
    const searchButton = document.getElementById('searchRecipes');

    const recipeID = Number(e.target.closest('section').id.slice(2));
    selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
      return currentRecipe.id === recipeID;
    })

    show([selectedRecipeView, homeButton, favoritePageButton, cookbookPageButton]);
    hide([mainView, searchBar, searchButton]);

    if (currentUser.recipesToCook.includes(selectedRecipe)) {
      selectAddToCookbookButton();
      addToCookbookButton.innerText = 'remove from cookbook';
    } else {
      deselectAddToCookbookButton()
      addToCookbookButton.innerText = 'add to cookbook';
    }

    if (currentUser.favorites.includes(selectedRecipe)) {
      singleViewFavoriteButton.value = 'favorited';
      singleViewFavoriteButton.classList.add('favorited-state');
    } else {
      singleViewFavoriteButton.value = 'unfavorited';
      singleViewFavoriteButton.classList.remove('favorited-state');
    }

    const ingredientListElement = getIngredientListElement(e, selectedRecipe);
    const instructionsElement = getInstructionsElement(e, selectedRecipe);
    const costNum = selectedRecipe.calculateRecipeCostInDollars(ingredientsData);

    ingredientListSection.innerHTML += ingredientListElement;
    instructionsSection.innerHTML += instructionsElement;
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

  instructionsSection.innerHTML = '<h3>instructions</h3>';

  const instructionsStrings = selectedRecipe.returnInstructions();

  const instructionsText = instructionsStrings.reduce((acc, instruction) => {
    acc += `${instruction}<br><br>`;
    return acc;
  }, '');

  return '<p class="selected-recipe-instructions">' + instructionsText + '</p>'
}

function show(elements) {
  elements.forEach(element => {
    element.classList.remove('hidden');
  })
}

function hide(elements) {
  elements.forEach(element => {
    element.classList.add('hidden');
  })
}
