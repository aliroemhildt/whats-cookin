// import postMessage from './scripts';
import {
  currentUser,
  querySelectors,
  addCardInfo,
  updateFavoriteButton
} from './scripts';

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

let domUpdates = {

  displayMessageDropdown(message) {
    const dropdownMessage = document.querySelector('.dropdown-message-js');
    dropdownMessage.innerText = `${message}`;
    dropdownMessage.classList.remove('hidden-visibility')
    setTimeout(() => {
      dropdownMessage.classList.add('fade-out')
    }, 2000);
    setTimeout(() => {
      dropdownMessage.classList.add('hidden-visibility');
      dropdownMessage.classList.remove('fade-out');
    }, 4000)
  },

  displayMessageButtons(e, message) {
    const buttonMessage = document.getElementById(`m${e.target.id}`);
    buttonMessage.innerText = message;
    setTimeout(() => {buttonMessage.classList.add('fade-out')}, 2000);
  },

  clearInputs() {
    dropdownElement.value = 'choose ingredient';
    quantityInput.value = '';
  },

  removeFromPage() {
    currentUser.removeFromFavorites();
    displayFavorites();
  },

  displayRecipes(recipes) {
    querySelectors.recipeSection.innerHTML = '';
    recipes.forEach(recipe => {
      querySelectors.recipeSection.innerHTML += `
        <section class='flex column align-center recipe-card recipe-card-js' id='id${recipe.id}'>
           <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
           <div class='flex column align-center recipe-card-text'>
             <button class='favorite-button favorite-button-js' value='unfavorited'>favorite</button>
             <p class='recipe-card-name'>${recipe.name}</p>
            </div>
         </section>
       `;
    })
  
    const recipeCards = document.querySelectorAll('.recipe-card-js');
    addCardInfo(recipeCards);
  
    const favoriteButtons = document.querySelectorAll('.favorite-button-js');
    updateFavoriteButton(favoriteButtons);
  },

  
  displayFavorites() {
    querySelectors.whatsCookin.classList.remove('home-page');
    hide([
      querySelectors.favoritePageButton,
      querySelectors.pantryView, 
      querySelectors.highlightKey,
      querySelectors.selectedRecipeView
    ]);
    show([
      querySelectors.filterSection,
      querySelectors.recipeSection, 
      querySelectors.mainView,
      querySelectors.cookbookPageButton,
      querySelectors.pageTitle,
      querySelectors.pantryPageButton
    ]);
    querySelectors.pageTitle.innerText = 'my favorites';
    querySelectors.filterButton.addEventListener('click', () => {
      filterRecipesByTag(currentUser.favorites)
    });
    querySelectors.searchRecipesButton.addEventListener('click', () => {
      searchAllRecipes(currentUser.favorites)
    });
    displayRecipes(currentUser.favorites);
    favoriteButtons = document.querySelectorAll('.favorite-button-js');
    favoriteButtons.forEach((button) => {
      button.addEventListener('click', domUpdates.removeFromPage);
    })
  },

}


export default domUpdates;