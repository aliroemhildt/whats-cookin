// IMPORTS
import {
  recipeRepository,
  ingredientsData,
  currentUser,
  selectedRecipe,
  postMessage,
  filterRecipesByTag,
  addIngredientToPantry,
  addCardInfo,
  changeAmount,
  removeIngredients,
  updateSelectedRecipe
}
  from './scripts'

// GLOBAL VARIABLES
let favoriteButtons = [];
let recipeCards = [];

// QUERY SELECTORS
const recipeSection = document.querySelector('.recipes-section-js');
const selectedRecipeView = document.querySelector('.individual-recipe-container-js');
const filterSection = document.querySelector('.filter-section-js');
const mainView = document.querySelector('.main-view-container-js');
const searchRecipesButton = document.getElementById('searchRecipes');
const filterButton = document.getElementById('filterButton');
const whatsCookin = document.querySelector('h1');
const searchBar = document.getElementById('searchInput');
const filterTags = document.querySelectorAll('.tag-js');
const favoritePageButton = document.getElementById('favoritesPage');
const addToCookbookButton = document.querySelector('.cookbook-button-js')
const cookbookPageButton = document.querySelector('.cookbook-page-button-js');
const singleViewFavoriteButton = document.querySelector('.single-view-favorite-button-js');
const pageTitle = document.querySelector('.page-title-js');
const pantryView = document.querySelector('.pantry-view-container-js');
const pantryPageButton = document.querySelector('.pantry-page-button-js');
const searchButton = document.getElementById('searchRecipes');
const highlightKey = document.querySelector('.key-js');
const dropdownElement = document.querySelector('.dropdown-js');
const quantityInput = document.querySelector('.quantity-input-js');
const addToPantryButton = document.querySelector('.form-button-js');

// EVENT LISTENERS
whatsCookin.addEventListener('click', displayHomePage);
favoritePageButton.addEventListener('click', displayFavorites);
addToCookbookButton.addEventListener('click', toggleCookbookButton);
cookbookPageButton.addEventListener('click', displayCookbook);
singleViewFavoriteButton.addEventListener('click', favoriteFromSingleRecipeView);
pantryPageButton.addEventListener('click', displayPantryView);
addToPantryButton.addEventListener('click', addIngredientToPantry);
searchRecipesButton.addEventListener('click', () => {
  searchAllRecipes(recipeRepository.recipeData);
});
searchBar.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    searchAllRecipes(recipeRepository.recipeData);
  }
});
filterButton.addEventListener('click', () => {
  filterRecipesByTag(recipeRepository.recipeData);
});

// FUNCTIONS
function show(elements) {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
}

function hide(elements) {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
}

function showCookbookStatus(selectedRecipe) {
  if (currentUser.recipesToCook.includes(selectedRecipe)) {
    selectAddToCookbookButton();
    addToCookbookButton.innerText = 'remove from cookbook';
  } else {
    deselectAddToCookbookButton();
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

function getIngredientListElement(e, selectedRecipe) {
  const ingredientListSection = document.querySelector('.ingredient-list-section-js');
  ingredientListSection.innerHTML = '<h3>ingredients</h3>';
  const ingredientNames = selectedRecipe.determineRecipeIngredients(ingredientsData);
  const ingredientListText = selectedRecipe.ingredients.reduce((acc, ingredient, index) => {
    let amount = ingredient.quantity.amount;
    if (!(ingredient.quantity.amount % 1) === 0) {
      amount = ingredient.quantity.amount.toFixed(2);
    }
    acc += `${ingredientNames[index]}: ${amount} ${ingredient.quantity.unit}<br><br>`;
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
  return '<p class="selected-recipe-instructions">' + instructionsText + '</p>';
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

function displayIngredientsNeeded(recipe) {
  const neededIngredients = currentUser.pantry.getMissingIngredients(recipe);
  const neededIngredientsSection = document.querySelector('.ingredients-needed-js');

  if (neededIngredients.length === 0) {
    neededIngredientsSection.innerHTML =
      `<p class="margin-12">you have all of the ingredients needed to cook this recipe!</p>
      <button class="cook-recipe-js">cook recipe</button>`;

    const cookRecipeButton = document.querySelector('.cook-recipe-js');
    cookRecipeButton.addEventListener('click', removeIngredients);
  } else {
    const elements = neededIngredients.reduce((acc, ingredient) => {
      const matchedId = ingredientsData.find(item => {
        return item.id === ingredient.ingredient;
      });
      const ingWithUnits = selectedRecipe.ingredients.find(item => {
        return item.id === ingredient.ingredient;
      });

      acc += `
        <p>${matchedId.name}: ${ingredient.amount} ${ingWithUnits.quantity.unit}</p><br>
      `
      return acc;
    }, '<h3>missing ingredients</h3>');
    neededIngredientsSection.innerHTML = elements;
  }
}

function updateFavoriteButton(favoriteButtons) {
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      toggleFavoriteButton(e);
    });
  });
}

function selectFavoriteButton(e) {
  e.target.value = 'favorited';
  e.target.classList.add('favorited-state');
}

function deselectFavoriteButton(e) {
  e.target.value = 'unfavorited';
  e.target.classList.remove('favorited-state');
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

function createTable() {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
  if (currentUser.pantry.ingredients.length > 0) {
    currentUser.pantry.ingredients.forEach((item) => {
      const ingredientData = ingredientsData.find((ingredient) => {
        return ingredient.id === item.ingredient;
      })
      tableBody.innerHTML += `
      <tr>
      <td class="ingredient-column">${ingredientData.name}</td>
      <td class="amount-column">${item.amount}</td>
      <td class="button-column flex align-center">
      <button class="round-buttons minus-js" id="${ingredientData.id}">-</button>
      <button class="round-buttons plus-js" id="${ingredientData.id}">+</button>
      <p id="m${ingredientData.id}" class ="button-message"></p>
      </td>
      </tr>`
    });
  } else {
    tableBody.innerHTML += `
    <tr>
      <td class="ingredient-column hidden-row"></td>
      <td class="amount-column hidden-row"></td>
      <td class="button-column hidden-row"></td>
    </tr>`
  }
  const minusButtons = document.querySelectorAll('.minus-js');
  minusButtons.forEach(button => {
    const amount = currentUser.pantry.ingredients.find(ingredient => {
      return ingredient.id === button.id
    });
    if (amount === 0) {
      button.classList.add('.disable-button')
    }
  })

}

function selectTableButtons() {
  const plusButtons = document.querySelectorAll('.plus-js');
  const minusButtons = document.querySelectorAll('.minus-js');
  plusButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      changeAmount(e);
    });
  });
  minusButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      changeAmount(e);
    });
  });
}

function searchAllRecipes(recipes) {
  const searchName = document.getElementById('searchInput').value;
  recipeRepository.filterByNameOrIng(searchName, ingredientsData, recipes);
  domUpdates.displayRecipes(recipeRepository.recipesToShow);
}

function displayFavorites() {
  whatsCookin.classList.remove('home-page');
  hide([favoritePageButton, pantryView, highlightKey, selectedRecipeView]);
  show([filterSection, recipeSection, mainView, cookbookPageButton, pageTitle, pantryPageButton]);
  pageTitle.innerText = 'my favorites';
  filterButton.addEventListener('click', () => {
    filterRecipesByTag(currentUser.favorites);
  });
  searchRecipesButton.addEventListener('click', () => {
    searchAllRecipes(currentUser.favorites);
  });
  domUpdates.displayRecipes(currentUser.favorites);
  favoriteButtons = document.querySelectorAll('.favorite-button-js');
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', removeFromPage);
  });
}

function removeFromPage() {
  currentUser.removeFromFavorites();
  displayFavorites();
}

function displayHomePage() {
  if (!whatsCookin.classList.contains('home-page')) {
    whatsCookin.classList.add('home-page');
    domUpdates.displayRecipes(recipeRepository.recipeData);
    searchBar.value = '';
    hide([selectedRecipeView, pantryView, highlightKey]);
    show([mainView, recipeSection, searchBar, searchRecipesButton, favoritePageButton, cookbookPageButton, pageTitle, pantryPageButton]);
    pageTitle.innerText = 'home';
    filterButton.addEventListener('click', () => {
      filterRecipesByTag(recipeRepository.recipeData);
    });
    searchRecipesButton.addEventListener('click', () => {
      searchAllRecipes(recipeRepository.recipeData);
    });
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
  domUpdates.displayRecipes(currentUser.recipesToCook);
  showRecipesUserCanCook();
}

function displayPantryView() {
  if (pantryView.classList.contains('hidden')) {
    whatsCookin.classList.remove('home-page');
    pageTitle.innerText = "my pantry";
    show([pantryView, cookbookPageButton, favoritePageButton]);
    hide([mainView, searchBar, searchButton, pantryPageButton, selectedRecipeView]);
    domUpdates.populatePantry();
  }
}

function showRecipesUserCanCook() {
  const recipeCards = document.querySelectorAll('.recipe-card-js');
  const recipesUserCanCook = recipeCards.forEach(recipeCard => {
    const recipeOnCard = currentUser.recipesToCook.find(recipe => {
      return recipe.id === parseInt(recipeCard.id.slice(2));
    });

    const haveIngredients = currentUser.pantry.checkPantry(recipeOnCard);
    if (haveIngredients) {
      recipeCard.childNodes[3].classList.add('highlight-card');
    }
  });
  return recipesUserCanCook;
}

function selectAddToCookbookButton() {
  addToCookbookButton.value = 'true';
  addToCookbookButton.classList.add('in-cookbook-state');
}

function deselectAddToCookbookButton() {
  addToCookbookButton.value = 'false';
  addToCookbookButton.classList.remove('in-cookbook-state');
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

let domUpdates = {
  displayRecipes(recipes) {
    recipeSection.innerHTML = '';
    recipes.forEach(recipe => {
      recipeSection.innerHTML += `
      <section class='flex column align-center recipe-card recipe-card-js' id='id${recipe.id}'>
      <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
      <div class='flex column align-center recipe-card-text'>
      <button class='favorite-button favorite-button-js' value='unfavorited'>favorite</button>
      <p class='recipe-card-name'>${recipe.name}</p>
      </div>
      </section>
      `;
    });

    recipeCards = document.querySelectorAll('.recipe-card-js');
    addCardInfo(recipeCards);

    const favoriteButtons = document.querySelectorAll('.favorite-button-js');
    updateFavoriteButton(favoriteButtons);
  },

  populateDropdown() {
    ingredientsData.sort((a, b) => {
      return a.name.localeCompare(b.name, 'en', {ignorePunctuation: true});
    }).forEach((ingredient) => {
      if (ingredient.name) {
        dropdownElement.innerHTML += `<option value="${ingredient.id}">${ingredient.name}</option>"`;
      }
    });
  },

  displayMessageDropdown(message) {
    const dropdownMessage = document.querySelector('.dropdown-message-js');
    dropdownMessage.innerText = `${message}`;
    dropdownMessage.classList.remove('hidden-visibility');
    setTimeout(() => {
      dropdownMessage.classList.add('fade-out')
    }, 2000);
    setTimeout(() => {
      dropdownMessage.classList.add('hidden-visibility');
      dropdownMessage.classList.remove('fade-out');
    }, 4000);
  },

  populatePantry() {
    createTable();
    selectTableButtons();
    domUpdates.disableButtons();
  },

  clearInputs() {
    dropdownElement.value = 'choose ingredient';
    quantityInput.value = '';
  },

  displayMessageButtons(e) {
    const buttonMessage = document.getElementById(`m${e.target.id}`);
    buttonMessage.innerText = postMessage;
    setTimeout(() => {
      buttonMessage.classList.add('fade-out')
    }, 2000);
  },

  disableButtons() {
    const minusButtons = document.querySelectorAll('.minus-js');
    minusButtons.forEach(button => {
      const ingredient = currentUser.pantry.ingredients.find(item => {
        return item.ingredient === parseInt(button.id)
      })
      if (ingredient.amount === 0) {
        button.classList.add('disable-button');
      }
    })
  },

  displaySelectedRecipe(e) {
    if (!e.target.classList.contains('favorite-button-js')) {
      whatsCookin.classList.remove('home-page');
      updateSelectedRecipe(e);
      show([selectedRecipeView, favoritePageButton, cookbookPageButton, pantryPageButton]);
      hide([mainView, searchBar, searchButton, pageTitle, pantryView, highlightKey]);

      showCookbookStatus(selectedRecipe);
      showFavoritesStatus(selectedRecipe);
      updateRecipeText(e, selectedRecipe, ingredientsData);
      displayIngredientsNeeded(selectedRecipe);
    }
  }
}

export {
  domUpdates,
  dropdownElement,
  quantityInput,
  filterTags,
  displayIngredientsNeeded
}
