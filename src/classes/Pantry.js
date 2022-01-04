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

  getMissingIngredients(recipe) {
    const ingredientsNeeded = recipe.ingredients.reduce((acc, ingredient) => {
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
      console.log(acc)
      return acc;
    }, [])
    console.log(ingredientsNeeded);
    return ingredientsNeeded;
  }

  // go into recipes, iterate through recipe.ingredients
  //this.pantry.find(item => item.ingredient === ingredient.id) - compare recipe ingredients to pantry ingredients
  // 
}

export default Pantry;