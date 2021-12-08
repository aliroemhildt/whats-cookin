

class RecipeRepository {
  constructor(recipeData, ingData) {
    this.recipeData = recipeData;
    this.ingredientData = ingData;
  };

  filterByNameOrIng(nameOrIng) {
    const recipesToShow = [];
    const ingredientID = this.getIngredientID(nameOrIng);
    const recipesByIngID = this.recipeData.filter((recipe) => {
      let ingIDs = recipe.ingredients.map((ingredient) => {
        return ingredient.id;
      });
      return ingIDs.includes(ingredientID[0]);
    });

    const addRecipesByIng = () => {
      recipesByIngID.forEach(recipe => {
        recipesToShow.push(recipe);
      });
    };

    addRecipesByIng();

    const recipesByName = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    });

    const recipesToShowLC = recipesToShow.map((recipe) => {
      return recipe.name.toLowerCase();
    });

    const recipesByNameNoDuplicates = recipesByName.filter(recipe => {
      return !recipesToShowLC.includes(recipe.name);
    });

    const addRecipesByName = () => {
      recipesByNameNoDuplicates.forEach(recipe => {
        recipesToShow.push(recipe);
      });
    };

    addRecipesByName();

    return recipesToShow;
  };

  getIngredientID(ingName) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientsFromSearch = this.ingredientData.filter((ingredient) => {
      return ingredient.name === ingNameLC;
    });

    const ingredientID = ingredientsFromSearch.map((ingredient) => {
      return ingredient.id;
    });

    return ingredientID;
  };
};

export default RecipeRepository;


// filterByNameOrIng():
// 1. create empty array that will hold recipes we want to display (from search)
// 2. get the ids of the ingredients that match the search term
// 3. check recipe data, push any recipe to recipesToShow if it's ing list
//    includes an ing from ingredientsToShow
// 4. check recipe name, push any recipe to recipesToShow if it's
//    name includes the search term
//        * only if it has not already been added to recipesToShow
// 5. return recipesToShow
// console.log(this.recipeData)
