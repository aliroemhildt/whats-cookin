// IMPORTS
import './styles.css';
import {
  userAPI,
  ingredientAPI,
  recipeAPI
} from './apiCalls';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

//API
let userIndex;
let currentUser;
let recipeList;
let recipeRepository;
let usersData;
let ingredientsData;
let recipeData;

Promise.all([userAPI, ingredientAPI, recipeAPI])
  .then(data => {
    [usersData, ingredientsData, recipeData] = [data[0], data[1], data[2]];
    userIndex = getRandomIndex(usersData);
    currentUser = new User(usersData[userIndex], ingredientsData);
    recipeList = recipeData.map(recipe => {
      return new Recipe(recipe);
    })
    recipeRepository = new RecipeRepository(recipeList);
    displayRecipes(recipeRepository.recipeData);
    populateDropdown();
  })
  .catch(error => console.log(error));

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
const whatsCookin = document.querySelector('h1');
const searchBar = document.getElementById('searchInput');
const filterTags = document.querySelectorAll('.tag');
const favoritePageButton = document.getElementById('favoritesPage');
const addToCookbookButton = document.querySelector('.cookbook-button-js')
const cookbookPageButton = document.querySelector('.cookbook-page-button-js');
const singleViewFavoriteButton = document.querySelector('.single-view-favorite-button-js');
const pageTitle = document.querySelector('.page-title-js');
const pantryView = document.querySelector('.pantry-view-container-js');
const pantryPageButton = document.querySelector('.pantry-page-button-js');
const searchButton = document.getElementById('searchRecipes');
const highlightKey = document.querySelector('.key');
const dropdownElement = document.querySelector('.dropdown');
const quantityInput = document.querySelector('.quantity-input');
const addToPantryButton = document.querySelector('.form-button');


// EVENT LISTENERS
searchRecipesButton.addEventListener('click', () => {
  searchAllRecipes(recipeRepository.recipeData);
});
searchBar.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    searchAllRecipes(recipeRepository.recipeData);
  }
})
filterButton.addEventListener('click', () => {
  filterRecipesByTag(recipeRepository.recipeData);
});
whatsCookin.addEventListener('click', displayHomePage);
favoritePageButton.addEventListener('click', displayFavorites);
addToCookbookButton.addEventListener('click', toggleCookbookButton);
cookbookPageButton.addEventListener('click', displayCookbook);
singleViewFavoriteButton.addEventListener('click', favoriteFromSingleRecipeView);
pantryPageButton.addEventListener('click', displayPantryView);
addToPantryButton.addEventListener('click', addIngredientToPantry);

// FUNCTIONS

async function postToPantry(id, amount) {
  return fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    body: JSON.stringify({
      userID: currentUser.id,
      ingredientID: id,
      ingredientModification: amount
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(getPantry())
}

function addIngredientToPantry() {
  const selectedIngID = parseInt(dropdownElement.value);
  const selectedQuantity = parseInt(quantityInput.value);
  console.log(currentUser.name);
  postToPantry(selectedIngID, selectedQuantity);
}

function getPantry() {
  return fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())
  .then(data => {
    currentUser.pantry = data;
  })
  .then(populatePantry())
}

function displayFavorites() {
  whatsCookin.classList.remove('home-page');
  hide([favoritePageButton, pantryView, highlightKey, selectedRecipeView]);
  show([filterSection, recipeSection, mainView, cookbookPageButton, pageTitle, pantryPageButton]);
  pageTitle.innerText = 'my favorites';
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
  whatsCookin.classList.remove('home-page');
  hide([addToCookbookButton, selectedRecipeView, cookbookPageButton, pantryView]);
  show([filterSection, mainView, recipeSection, favoritePageButton, addToCookbookButton, pageTitle, highlightKey, pantryPageButton]);
  pageTitle.innerText = 'my cookbook';
  filterButton.addEventListener('click', () => {
    filterRecipesByTag(currentUser.recipesToCook);
  });
  searchRecipesButton.addEventListener('click', () => {
    searchAllRecipes(currentUser.recipesToCook);
  });
  displayRecipes(currentUser.recipesToCook);
  showRecipesUserCanCook();
}

function showRecipesUserCanCook() {
  const recipeCards = document.querySelectorAll('.recipe-card-js');
  const recipesUserCanCook = recipeCards.forEach(recipeCard => {
    const recipeOnCard = currentUser.recipesToCook.find(recipe => {
      return recipe.id === parseInt(recipeCard.id.slice(2))
    })

    const haveIngredients = currentUser.pantry.checkPantry(recipeOnCard);
    if (haveIngredients) {
      recipeCard.childNodes[3].classList.add('highlight-card');
    }
  })

  return recipesUserCanCook;
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
  if (!whatsCookin.classList.contains('home-page')) {
    whatsCookin.classList.add('home-page');
    displayRecipes(recipeRepository.recipeData);
    searchBar.value = '';
    hide([selectedRecipeView, pantryView, highlightKey]);
    show([mainView, recipeSection, searchBar, searchRecipesButton, favoritePageButton, cookbookPageButton, pageTitle, pantryPageButton]);
    pageTitle.innerText = 'home';
    filterButton.addEventListener('click', () => {
      filterRecipesByTag(recipeRepository.recipeData);
    })
    searchRecipesButton.addEventListener('click', () => {
      searchAllRecipes(recipeRepository.recipeData);
    })
  }
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
  addCardInfo(recipeCards);

  favoriteButtons = document.querySelectorAll('.favorite-button-js');
  updateFavoriteButton(favoriteButtons);
}

function updateFavoriteButton(favoriteButtons) {
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      toggleFavoriteButton(e);
    })
  })
}

function addCardInfo(recipeCards) {
  recipeCards.forEach((card, index) => {
    const cardId = Number(card.id.slice(2));
    const currentRecipe = recipeRepository.recipeData.find(recipe => {
      return recipe.id === cardId;
    })

    const button = card.childNodes[3].childNodes[1];
    if (currentUser.favorites.includes(currentRecipe)) {
      button.value = 'favorited';
      button.classList.add('favorited-state');
    }
    card.addEventListener('click', function (e) {
      displaySelectedRecipe(e);
    })
  })
}

function searchAllRecipes(recipes) {
  const searchName = document.getElementById('searchInput').value;
  recipeRepository.filterByNameOrIng(searchName, ingredientsData, recipes);
  displayRecipes(recipeRepository.recipesToShow);
}

function displaySelectedRecipe(e) {
  if (!e.target.classList.contains('favorite-button-js')) {
    whatsCookin.classList.remove('home-page');
    const recipeID = Number(e.target.closest('section').id.slice(2));
    selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
      return currentRecipe.id === recipeID;
    })

    show([selectedRecipeView, favoritePageButton, cookbookPageButton, pantryPageButton]);
    hide([mainView, searchBar, searchButton, pageTitle, pantryView, highlightKey]);
    showCookbookStatus(selectedRecipe);
    showFavoritesStatus(selectedRecipe);
    updateRecipeText(e, selectedRecipe, ingredientsData);

    displayIngredientsNeeded(selectedRecipe);
  }
}

function displayIngredientsNeeded(recipe) {
  const neededIngredients = currentUser.pantry.getMissingIngredients(recipe);
  const neededIngredientsSection = document.querySelector('.ingredients-needed-js');

  if (neededIngredients.length === 0) {
    neededIngredientsSection.innerText = 'you have all of the ingredients needed to cook this recipe!';
  } else {
    const elements = neededIngredients.reduce((acc, ingredient) => {
      const matchedId = ingredientsData.find(item => {
        return item.id === ingredient.ingredient
      })
      const ingWithUnits = selectedRecipe.ingredients.find(item => {
        return item.id === ingredient.ingredient
      })

      acc += `
        ${matchedId.name}: ${ingredient.amount} ${ingWithUnits.quantity.unit}<br>
      `
      return acc;
    }, '<h3>for this recipe you are missing: </h3>')
    neededIngredientsSection.innerHTML = elements;
  }
}


function displayPantryView() {
  if (pantryView.classList.contains('hidden')) {
    whatsCookin.classList.remove('home-page');
    pageTitle.innerText = "my pantry";
    show([pantryView, cookbookPageButton, favoritePageButton]);
    hide([mainView, searchBar, searchButton, pantryPageButton, selectedRecipeView]);
    populatePantry();
  }
}

function populatePantry() {
  const tableBody = document.querySelector('tbody')
  tableBody.innerHTML = '';
  currentUser.pantry.ingredients.forEach((item) => {
    const ingredientData = ingredientsData.find((ingredient) => {
      return ingredient.id === item.ingredient
    })
    tableBody.innerHTML += `
      <tr>
        <td>${ingredientData.name}</td>
        <td>${item.amount}</td>
        <td class="button-column">
          <button class="round-buttons">-</button>
          <button class="round-buttons">+</button>
        </td>
      </tr>`
  })
}


function populateDropdown() {
  ingredientsData.sort((a, b) => {
    return a.name.localeCompare(b.name, 'en', {ignorePunctuation: true});
  }).forEach((ingredient) => {
    if (ingredient.name) {
      dropdownElement.innerHTML += `<option value="${ingredient.id}">${ingredient.name}</option>"`
    }
  });
}

function showCookbookStatus(selectedRecipe) {
  if (currentUser.recipesToCook.includes(selectedRecipe)) {
    selectAddToCookbookButton();
    addToCookbookButton.innerText = 'remove from cookbook';
  } else {
    deselectAddToCookbookButton()
    addToCookbookButton.innerText = 'add to cookbook';
  }
}

function showFavoritesStatus(selectedRecipe) {
  if (currentUser.favorites.includes(selectedRecipe)) {
    singleViewFavoriteButton.value = 'favorited';
    singleViewFavoriteButton.classList.add('favorited-state');
  } else {
    singleViewFavoriteButton.value = 'unfavorited';
    singleViewFavoriteButton.classList.remove('favorited-state');
  }
}

function updateRecipeText(e, selectedRecipe, ingredientsData) {
  const instructionsSection = document.querySelector('.instructions-section-js');
  const ingredientListSection = document.querySelector('.ingredient-list-section-js');
  const image = document.querySelector('.selected-recipe-photo-js');
  const name = document.querySelector('.selected-recipe-name-js');
  const cost = document.querySelector('.cost-js');

  const ingredientListElement = getIngredientListElement(e, selectedRecipe);
  const instructionsElement = getInstructionsElement(e, selectedRecipe);
  const costNum = selectedRecipe.calculateRecipeCostInDollars(ingredientsData);

  ingredientListSection.innerHTML += ingredientListElement;
  instructionsSection.innerHTML += instructionsElement;
  image.src = selectedRecipe.image;
  name.innerText = selectedRecipe.name;
  cost.innerText = `$${costNum}`;
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
