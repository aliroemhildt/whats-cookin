class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
    this.recipesToShow = [];
  };

  filterByTags(selectedTags) {
    return this.recipeData.reduce((acc, recipe) => {
      recipe.tags.forEach(tag => {
        selectedTags.forEach(selectedTag => {
          if(tag === selectedTag) {
          acc.push(recipe)
          }
        })
      })
      return acc;
    }, [])
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

  filterByNameOrIng(nameOrIng, ingredientsData) {
    this.recipesToShow = [];
    const ingredientID = this.getIngredientID(nameOrIng, ingredientsData);
    const recipesByIngID = this.recipeData.filter((recipe) => {
      let ingIDs = recipe.ingredients.map((ingredient) => {
        return ingredient.id;
      });
      return ingIDs.includes(ingredientID[0]);
    });

    const addRecipesByIng = () => {
      recipesByIngID.forEach(recipe => {
        this.recipesToShow.push(recipe);
      });
    };

    addRecipesByIng();

    const recipesByName = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    });

    const recipesToShowLC = this.recipesToShow.map((recipe) => {
      return recipe.name.toLowerCase();
    });

    const recipesByNameNoDuplicates = recipesByName.filter(recipe => {
      return !recipesToShowLC.includes(recipe.name);
    });

    const addRecipesByName = () => {
      recipesByNameNoDuplicates.forEach(recipe => {
        this.recipesToShow.push(recipe);
      });
    };

    addRecipesByName();

    return this.recipesToShow;
  };
};

export default RecipeRepository;
