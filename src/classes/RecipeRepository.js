class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
    this.recipesToShow = [];
  }

  addAllRecipesToRecipesToShow() {
    this.recipeData.forEach(recipe => {
      this.recipesToShow.push(recipe);
    });
  }

  filterByTags(selectedTags, recipes) {
    this.recipesToShow = [];
    const recipesWithTags = recipes.reduce((acc, recipe) => {
      recipe.tags.forEach(tag => {
        selectedTags.forEach(selectedTag => {
          if(tag === selectedTag && !acc.includes(recipe)) {
            acc.push(recipe);
          };
        });
      });
      return acc;
    }, []);
    recipesWithTags.forEach(recipe => {
      this.recipesToShow.push(recipe)
    })
  }

  getIngredientID(ingName, ingredientsData) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientIDFromSearch = ingredientsData.reduce((acc, ingredient) => {
      if (ingredient.name === ingNameLC) {
        acc = ingredient.id;
      };
      return acc;
    }, 0);
    return ingredientIDFromSearch;
  }

  filterByIng(nameOrIng, ingredientsData, recipes) {
    const ingredientID = this.getIngredientID(nameOrIng, ingredientsData);
    return recipes.filter((recipe) => {
      let ingIDs = recipe.ingredients.map((ingredient) => {
        return ingredient.id;
      });
      return ingIDs.includes(ingredientID);
    });
  }

  filterByName(nameOrIng, ingredientsData, recipes) {
    return recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    });
  }

  filterByNameOrIng(nameOrIng, ingredientsData, recipes) {
    this.recipesToShow = [];
    let recipesByIng = this.filterByIng(nameOrIng, ingredientsData, recipes);
    let recipesByName = this.filterByName(nameOrIng, ingredientsData, recipes);

    recipesByIng.forEach(recipe => {
      this.recipesToShow.push(recipe);
    });

    recipesByName.forEach(recipe => {
      if (!this.recipesToShow.includes(recipe)) {
        this.recipesToShow.push(recipe)
      };
    });
  }
};

export default RecipeRepository;
