class Pantry {
  constructor(ingredients) {
    this.ingredients = ingredients
  }

  checkPantry(recipe) {
    let hasAllIngredients = true;

    recipe.ingredients.forEach(recipeIng => {
      const matchedId = this.ingredients.find(pantryIng => {
        return recipeIng.id === pantryIng.ingredient;
      })

      if ((matchedId && (matchedId.amount < recipeIng.quantity.amount)) || !matchedId) {
        hasAllIngredients = false;
      }
    })

    return hasAllIngredients;
  }

  getMissingIngredients(recipe) {
    return recipe.ingredients.reduce((acc, ingredient) => {
      const matchedId = this.ingredients.find(item => item.ingredient === ingredient.id);
      if (matchedId && (ingredient.quantity.amount > matchedId.amount)) {
        const ingredientDetails = {
          ingredient: ingredient.id,
          amount: ingredient.quantity.amount - matchedId.amount
        };
        acc.push(ingredientDetails);
      } else if (!matchedId) {
        const ingredientDetails = {
          ingredient: ingredient.id,
          amount: ingredient.quantity.amount
        };
        acc.push(ingredientDetails);
      }
      return acc;
    }, [])
  }

}

export default Pantry;