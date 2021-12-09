class RecipeRepository {
  constructor(recipeData, ingredientsData) {
    this.recipeData = recipeData;
    this.ingredientsData = ingredientsData;
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

  getIngredientID(ingName) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientsFromSearch = this.ingredientsData.filter((ingredient) => {
      return ingredient.name === ingNameLC;
    });

    const ingredientID = ingredientsFromSearch.map((ingredient) => {
      return ingredient.id;
    });

    return ingredientID;
    //we can chain the .map and return ingredientsFromSearch
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
};







export default RecipeRepository;
