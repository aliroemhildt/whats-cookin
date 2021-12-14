class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
    this.recipesToShow = [];
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
      this.recipesToShow.push(recipe);
    })
  }

  getIngredientIDs(ingName, ingredientsData) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientIDsFromSearch = ingredientsData.reduce((acc, ingredient) => {
      const ingredientName = ingredient.name.toLowerCase();
      if (ingredientName.includes(ingNameLC)) {
        acc.push(ingredient.id);
      }
      return acc;
    }, []);
    return ingredientIDsFromSearch;
  }

  filterByIng(nameOrIng, ingredientsData, recipes) {
    const ingredientIDs = this.getIngredientIDs(nameOrIng, ingredientsData);
    const recipesWithIngs = recipes.reduce((acc, recipe) => {
      ingredientIDs.forEach(ingredientID => {
        recipe.ingredients.forEach(ingredient => {
          if (ingredientID === ingredient.id && !acc.includes(recipe)) {
            acc.push(recipe);
          }
        })
      })
      return acc;
    }, []);
    return recipesWithIngs;
  }

  filterByName(nameOrIng, ingredientsData, recipes) {
    return recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    })
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
        this.recipesToShow.push(recipe);
      }
    })
  }
}

export default RecipeRepository;
