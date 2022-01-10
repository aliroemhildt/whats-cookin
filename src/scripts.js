// IMPORTS
import './styles/index.scss';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';
import Pantry from '../src/classes/Pantry';
import {
  userAPI,
  ingredientAPI,
  recipeAPI,
  post
} from './apiCalls';
import {
  domUpdates,
  dropdownElement,
  quantityInput,
  filterTags,
  displayIngredientsNeeded
} from './domUpdates';

// GLOBAL VARIABLES
let userIndex;
let currentUser;
let recipeList;
let recipeRepository;
let usersData;
let ingredientsData;
let recipeData;
let postMessage;
let selectedRecipe;

// FUNCTIONS
Promise.all([userAPI, ingredientAPI, recipeAPI])
  .then(data => {
    [usersData, ingredientsData, recipeData] = [data[0], data[1], data[2]];
    userIndex = getRandomIndex(usersData);
    currentUser = new User(usersData[userIndex], ingredientsData);
    recipeList = recipeData.map(recipe => {
      return new Recipe(recipe);
    })
    recipeRepository = new RecipeRepository(recipeList);
    domUpdates.displayRecipes(recipeRepository.recipeData);
    domUpdates.populateDropdown();
  })
  .catch(error => console.log(error));

async function postToPantry(info) {
  try {
    let response = await post(info);
    let message = await response.json();
    postMessage = message.message;
  }
   catch(error) {
    console.log(error);
   }
}

async function getPantry() {
  let response = await fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(data => reassignUserPantry(data))
    .catch(error => console.log(error))
}

async function addIngredientToPantry() {
  const selectedIngID = parseFloat(dropdownElement.value);
  const selectedQuantity = parseFloat(quantityInput.value);
  const info = currentUser.modifyIngredient(selectedIngID, selectedQuantity);
  if (selectedIngID && selectedQuantity) {
    await postToPantry(info);
    domUpdates.displayMessageDropdown(postMessage);
    await getPantry();
    domUpdates.populatePantry();
    domUpdates.clearInputs();
  } else {
    const message = 'please choose an ingredient and quantity';
    domUpdates.displayMessageDropdown(message)
  }
}

async function removeRecipeIngredients() {
  for (const ingredient of selectedRecipe.ingredients) {
    const amount = -(parseFloat(ingredient.quantity.amount));
    const info = currentUser.modifyIngredient(ingredient.id, amount);
    await postToPantry(info);
  }
}

async function removeIngredients() {
  await removeRecipeIngredients();
  await getPantry();
  displayIngredientsNeeded(selectedRecipe);
}

async function changeAmount(e) {
  const currentAmount = currentUser.pantry.ingredients.find(item => {
    return item.ingredient === parseInt(e.target.id)
  }).amount
  let amount;
  if (currentAmount >= 0 && e.target.classList.contains('plus-js')) {
    amount = 1
  } else if (currentAmount >= 1 && e.target.classList.contains('minus-js')) {
    amount = -1
  } else {
    return
  }
  const id = parseInt(e.target.id);
  const info = currentUser.modifyIngredient(id, amount);
  await postToPantry(info);
  await getPantry();
  domUpdates.populatePantry();
  domUpdates.displayMessageButtons(e, postMessage);
}

function reassignUserPantry(data) {
  const updatedUser = data.find((user) => {
    return user.id === currentUser.id
  });
  currentUser.pantry = new Pantry(updatedUser.pantry);
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
    domUpdates.displayRecipes(recipeRepository.recipesToShow);
  } else {
    domUpdates.displayRecipes(recipes);
  }
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
      domUpdates.displaySelectedRecipe(e);
    })
  })
}

function updateSelectedRecipe(e) {
  const recipeID = Number(e.target.closest('section').id.slice(2));
  selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
    return currentRecipe.id === recipeID;
  })
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export {
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
