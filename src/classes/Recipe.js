import ingredientsData from "../data/ingredients";

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }
  getIngredientIDs() {
    let ingredientIDs = this.ingredients.reduce((acc, ingredient) => {
      if(!acc.includes(ingredient.id)) {
        acc.push(ingredient.id)
      };
      return acc;
    }, []);  
    return ingredientIDs;
  };
  
  determineRecipeIngredients(ingredientsData) {
    const ingredientIDs = this.getIngredientIDs();
    const matchNamesWithID = ingredientIDs.reduce((acc, currentID) => {
      const ingredientMatch = ingredientsData.find((ingredient) => {
        return ingredient.id === currentID
      });
      acc.push(ingredientMatch.name);
      return acc;
    }, []);

    return matchNamesWithID;
  };

  calculateRecipeCostInDollars(ingredientsData) {
    const totalIngredientsCost = this.ingredients.reduce((acc, currIngredient) => {
      
      const ingredientDataMatch = ingredientsData.find((ingredient) => {
        return ingredient.id === currIngredient.id
      });
      
      const currentIngredientCost = currIngredient.quantity.amount * ingredientDataMatch.estimatedCostInCents;
      
      acc += currentIngredientCost;
      return acc;
    }, 0);
    return (totalIngredientsCost / 100); 
  };
}
// A Recipe represents one recipe object (name, id, ingredients, instructions).
// pass in recipe data

// It should hold on to all its information (provided in the data file).
// It should have methods to:
// Determine the names of ingredients needed
// Get the cost of its ingredients
// Return its directions / instructions

export default Recipe;
