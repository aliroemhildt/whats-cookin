import currentUser from './scripts'


//QUERY SELECTORS
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

//FUNCTIONS
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

function updateFavoriteButton(favoriteButtons) {
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      toggleFavoriteButton(e);
    })
  })
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

function displayRecipes(recipes) {
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
  })

  recipeCards = document.querySelectorAll('.recipe-card-js');
  addCardInfo(recipeCards);

  favoriteButtons = document.querySelectorAll('.favorite-button-js');
  updateFavoriteButton(favoriteButtons);
}

function createTable() {
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
    <td class="button-column flex">
    <button class="round-buttons minus-js" id="${ingredientData.id}">-</button>
    <button class="round-buttons plus-js" id="${ingredientData.id}">+</button>
    <p id='m${ingredientData.id}' class ='button-message'></p>
    </td>
    </tr>`
  });
}

function selectTableButtons() {
  const plusButtons = document.querySelectorAll('.plus-js');
  const minusButtons = document.querySelectorAll('.minus-js');
  plusButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      changeAmount(e)
    });
  })
  minusButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      changeAmount(e)
    });
  })
}

function searchAllRecipes(recipes) {
  const searchName = document.getElementById('searchInput').value;
  recipeRepository.filterByNameOrIng(searchName, ingredientsData, recipes);
  displayRecipes(recipeRepository.recipesToShow);
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

removeFromPage() {
  currentUser.removeFromFavorites();
  displayFavorites();
},

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

  populatePantry() {
    createTable();
    selectTableButtons();
  },

  populateDropdown() {
    ingredientsData.sort((a, b) => {
      return a.name.localeCompare(b.name, 'en', {
        ignorePunctuation: true
      });
    }).forEach((ingredient) => {
      if (ingredient.name) {
        dropdownElement.innerHTML += `<option value="${ingredient.id}">${ingredient.name}</option>"`
      }
    });
  },

  clearInputs() {
    dropdownElement.value = 'choose ingredient';
    quantityInput.value = '';
  },

  displayMessageButtons(e, message) {
    const buttonMessage = document.getElementById(`m${e.target.id}`);
    buttonMessage.innerText = message;
    setTimeout(() => {buttonMessage.classList.add('fade-out')}, 2000);
  },

  displayMessageDropdown(message) {
    const dropdownMessage = document.querySelector('.dropdown-message-js');
    dropdownMessage.innerText = `${message}`;
    dropdownMessage.classList.remove('hidden-visibility')
    setTimeout(() => {dropdownMessage.classList.add('fade-out')}, 2000);
    setTimeout(() => {
      dropdownMessage.classList.add('hidden-visibility');
      dropdownMessage.classList.remove('fade-out');
    }, 4000)
  }



}


export {domUpdates, displayRecipes, show, hide}
