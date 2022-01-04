class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients
  }

  checkPantry(recipe) {
    let hasAllIngredients = true;

    recipe.ingredients.forEach(recipeIng => {
      const ingInPantry = this.ingredients.find(pantryIng => {
        return recipeIng.id === pantryIng.ingredient;
      })

      if ((ingInPantry && (ingInPantry.amount < recipeIng.quantity.amount)) || !ingInPantry) {
        hasAllIngredients = false;
      }
    })

    return hasAllIngredients;
  }
}

export default Pantry;
