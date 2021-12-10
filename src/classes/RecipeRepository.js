class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
    this.recipesToShow = [];
  };

  addAllRecipesToRecipesToShow() {
    this.recipeData.forEach(recipe => {
      this.recipesToShow.push(recipe);
    });
  };

  filterByTags(selectedTags) {
    return this.recipeData.reduce((acc, recipe) => {
      recipe.tags.forEach(tag => {
        selectedTags.forEach(selectedTag => {
          if(tag === selectedTag) {
            acc.push(recipe);
          };
        });
      });
      return acc;
    }, []);
  };

  getIngredientID(ingName, ingredientsData) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientIDFromSearch = ingredientsData.filter((ingredient) => {
      return ingredient.name === ingNameLC;
    }).map((ingredient) => {
      return ingredient.id;
    });

    return ingredientIDFromSearch
  };

  filterByIng(nameOrIng, ingredientsData) {
    const ingredientID = this.getIngredientID(nameOrIng, ingredientsData);
    const recipesByIngID = this.recipeData.filter((recipe) => {
      let ingIDs = recipe.ingredients.map((ingredient) => {
        return ingredient.id;
      });
      return ingIDs.includes(ingredientID[0]);
    });

    return recipesByIngID.forEach(recipe => {
      this.recipesToShow.push(recipe);
    });
  };

  filterByName(nameOrIng, ingredientsData) {
    const recipesByName = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    });

    const recipesToShowLC = this.recipesToShow.map((recipe) => {
      return recipe.name.toLowerCase();
    });

    const recipesByNameNoDuplicates = recipesByName.filter(recipe => {
      return !recipesToShowLC.includes(recipe.name);
    }).forEach(recipe => {this.recipesToShow.push(recipe)});
  };

  filterByNameOrIng(nameOrIng, ingredientsData) {
    this.recipesToShow = [];
    this.filterByIng(nameOrIng, ingredientsData);
    this.filterByName(nameOrIng, ingredientsData);
    return this.recipesToShow;
  };
};

export default RecipeRepository;
