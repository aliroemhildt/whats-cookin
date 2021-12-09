import ingredientsData from "../data/ingredients";

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  determineIng() {
    let ingredientIDs = this.ingredients.reduce((acc, ingredient) => {
      return acc.push(ingredient.name)
    }, [])
    console.log(ingredientIDs)
    console.log(acc)
    //matching the id no. to the ingredient name in the igredientsData
    // iterate through the ingredients object and return an array of id numbers.
    // map the array of id numbers and find the matching id number in the ingredients list and return the associated name of the ingredients in an array
  }

}

// A Recipe represents one recipe object (name, id, ingredients, instructions).
// pass in recipe data

// It should hold on to all its information (provided in the data file).
// It should have methods to:
// Determine the names of ingredients needed
// Get the cost of its ingredients
// Return its directions / instructions

export default Recipe;
