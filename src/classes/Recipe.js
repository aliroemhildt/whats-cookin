import ingredientsData from "../data/ingredients";

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  getIngredientIDs() {
    let ingredientIDs = this.ingredients.reduce((acc, ingredient) => {
      if(!acc.includes(ingredient.id)) {
        acc.push(ingredient.id);
      };
      return acc;
    }, []);
    return ingredientIDs;
  }

  determineRecipeIngredients(ingredientsData) {
    const ingredientIDs = this.getIngredientIDs();
    const matchNamesWithID = ingredientIDs.reduce((acc, currentID) => {
      const ingredientMatch = ingredientsData.find((ingredient) => {
        return ingredient.id === currentID;
      });
      acc.push(ingredientMatch.name);
      return acc;
    }, []);

    return matchNamesWithID;
  }

  calculateRecipeCostInDollars(ingredientsData) {
    const totalIngredientsCost = this.ingredients.reduce((acc, currIngredient) => {
      const ingredientDataMatch = ingredientsData.find((ingredient) => {
        return ingredient.id === currIngredient.id;
      });

      const currentIngredientCost = currIngredient.quantity.amount * ingredientDataMatch.estimatedCostInCents;

      acc += currentIngredientCost;
      return acc;
    }, 0);

    return Number((totalIngredientsCost / 100).toFixed(2));
  }

  returnInstructions() {
    const getInstructions = this.instructions.reduce((acc, currInstruction) => {
      const instructionToReturn = `Step ${currInstruction.number}: ${currInstruction.instruction}`
      acc.push(instructionToReturn);
      return acc;
    }, []);

    return getInstructions;
  }
}


export default Recipe;
