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
          if(tag === selectedTag && !acc.includes(recipe)) {
            acc.push(recipe);
          };
        });
      });
      return acc;
    }, []);
  };

  getIngredientID(ingName, ingredientsData) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientIDFromSearch = ingredientsData.reduce((acc, ingredient) => {
      if (ingredient.name === ingNameLC) {
        acc = ingredient.id;
      };
      return acc;
    }, 0);
    return ingredientIDFromSearch;
  };

  filterByIng(nameOrIng, ingredientsData) {
    const ingredientID = this.getIngredientID(nameOrIng, ingredientsData);
    return this.recipeData.filter((recipe) => {
      let ingIDs = recipe.ingredients.map((ingredient) => {
        return ingredient.id;
      });
      return ingIDs.includes(ingredientID);
    });
  };

  filterByName(nameOrIng, ingredientsData) {
    return this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    });
  };

  filterByNameOrIng(nameOrIng, ingredientsData) {
    this.recipesToShow = [];
    let recipesByIng = this.filterByIng(nameOrIng, ingredientsData);
    let recipesByName = this.filterByName(nameOrIng, ingredientsData);

    recipesByIng.forEach(recipe => {
      this.recipesToShow.push(recipe);
    });

    recipesByName.forEach(recipe => {
      if (!this.recipesToShow.includes(recipe)) {
        this.recipesToShow.push(recipe)
      };
    });
  };
};

export default RecipeRepository;
