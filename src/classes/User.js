import Pantry from './Pantry';

class User {
  constructor(user, ingredientsData) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = new Pantry(user.pantry);
    this.favorites = [];
    this.recipesToCook = [];
    this.ingredients = ingredientsData;
  }

  addToFavorites(recipe) {
    if (!this.favorites.includes(recipe)) {
      this.favorites.push(recipe);
    }
  }

  removeFromFavorites(recipe) {
    const recipeIndex = this.favorites.indexOf(recipe);
    if (recipeIndex !== -1) {
      this.favorites.splice(recipeIndex, 1);
    }
  }

  addToRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
  }

  removeFromRecipesToCook(recipe) {
    const recipeIndex = this.recipesToCook.indexOf(recipe);
    if (recipeIndex !== -1) {
      this.recipesToCook.splice(recipeIndex, 1);
    }
  }

  filterFavoritesByTag(tag) {
    return this.favorites.filter(recipe => {
      return recipe.tags.includes(tag);
    })
  }

  filterFavoritesByName(name) {
    name = name.toLowerCase();

    return this.favorites.reduce((acc, favoriteRecipe) => {
      if (favoriteRecipe.name.toLowerCase().includes(name)) {
        acc.push(favoriteRecipe);
        return acc;
      }

      this.ingredients.filter((ingredient) => {
        favoriteRecipe.ingredients.filter((recipeIngredient) => {
          if (ingredient.id === recipeIngredient.id &&
              ingredient.name.toLowerCase() === name) {
            acc.push(favoriteRecipe);
          }
        });
      });

      return acc;
    }, [])
  }
}

export default User;
