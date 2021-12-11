// IMPORTS
import './styles.css';
import apiCalls from './apiCalls';
import ingredientsData from '../src/data/ingredients';
import recipeData from '../src/data/recipes';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';

// GLOBAL VARIABLES
const recipeList = recipeData.map(recipe => {
  return new Recipe(recipe);
});

const recipeRepository = new RecipeRepository(recipeList)
let recipeCards = []

// QUERY SELECTORS
const recipeSection = document.querySelector('.recipes-section');
const selectedRecipeView = document.querySelector('.individual-recipe-container');
const filterBar = document.querySelector('.filter-section');
const mainView = document.querySelector('.main-view-container');

// EVENT LISTENERS
window.addEventListener('load', displayAllRecipes);

recipeCards.forEach((card) => {
  card.addEventListener('click', function(e) {
    displaySelectedRecipe(e)
  });
});

// FUNCTIONS
function displayRecipes() {
  recipeSection.innerHTML = '';  recipeRepository.recipesToShow.forEach(recipe => {
    recipeSection.innerHTML += `
      <section class='recipe-card' id='id${recipe.id}'>
         <img class='recipe-card-image' src=${recipe.image} alt='recipe image' class='recipe-photo'>
         <button class='favorite-button'>FAVORITE</button>
         <p class='recipe-card-name'>${recipe.name}</p>
       </section>
     `;
  });
  recipeCards = document.querySelectorAll('.recipe-card');
  recipeCards.forEach((card) => {
    card.addEventListener('click', displaySelectedRecipe)
  });
}

function displayAllRecipes() {
  recipeRepository.addAllRecipesToRecipesToShow();
  displayRecipes();
}

function displaySelectedRecipe(e) {
  if(e.target.classList.value !== 'favorite-button') {
    const image = document.querySelector('.selected-recipe-photo-js');
    const name = document.querySelector('.selected-recipe-name-js');
    const cost = document.querySelector('.selected-recipe-cost-js');
    const instructions = document.querySelector('.selected-recipe-instructions-js');
    const ingredientListSection = document.querySelector('.ingredient-list-section-js')

    show([selectedRecipeView]);
    hide([mainView]);

    let ingredientListElement = getIngredientListElement(e);

    ingredientListSection.innerHTML += ingredientListElement;
    image.src = selectedRecipe.image;
    name.innerText = selectedRecipe.name;

    // const ingredientElement = document.createElement('P');
    // const ingredientText = document.createTextNode(ingredientList);
    // ingredientElement.appendChild(ingredientText);
    // ingredientListSection.appendChild(ingredientElement);


    //we have ingredientNames in an array
    //we have ingredient objects in an array (the quanity and unit)
    //for each ingredient, we want to add a line to the innerText that says "ingredient name: quantity unit "

    // ingredientList.forEach(())
    // cost.innerText =
    // instructions.innerText =

    // const ingredientList = document.querySelector('.selected-recipe-ingredient-list-js');

    // selectedRecipe.ingredients.forEach((ingredient, index) => {
    //   ingredientListSection.innerText += `${ingredientNames[index]} ${ingredient.quanity.amount}${ingredient.quantity.unit}`
    // })
  }
}

function getIngredientListElement(e) {
  const ingredientListSection = document.querySelector('.ingredient-list-section-js')

  ingredientListSection.innerHTML = '<h3>Ingredients</h3>'; // i think we will need this line to reset the ingredient list to be empty each time we click into a new recipe

  const recipeID = Number(e.target.parentNode.id.slice(2));

  let selectedRecipe = recipeRepository.recipeData.find((currentRecipe) => {
    return currentRecipe.id === recipeID;
  });

  const ingredientNames = selectedRecipe.determineRecipeIngredients(ingredientsData);

  const ingredientListText = selectedRecipe.ingredients.reduce((acc, ingredient, index) => {
    acc += `${ingredientNames[index]} ${ingredient.quantity.amount}${ingredient.quantity.unit}<br>`
    return acc;
  }, '');

  return '<p class="selected-recipe-ingredient-list">' + ingredientListText + '</p>';
};

function show(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  };
};

function hide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  };
};


//need a funtion that will display ONLY the recipe that's clicked on
//1. click a recipe CARD
//2. hide the filter section (class="filter-section") and hide main recipe section (class="recipes-section")
//3. remove hidden from class="individual-recipe-container hidden"
//4. change the inner text of all the properties:
// - the src of the recipe image
// - the recipe title
// - the ingredients List
// - the total Cost
// - the instructions (<p></p>)
// call our method we wrote



// boilerplate html for each recipe card:
// <section class='recipe-card'>
//   <img src='' alt='' class='recipe-photo'>
//   <img src='' alt='favorite-button' class='favorite-button'>
//   <p>Recipe Name</p>
// </section>
