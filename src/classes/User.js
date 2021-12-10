class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favorites = [];
    this.recipesToCook = [];
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

}

export default User;