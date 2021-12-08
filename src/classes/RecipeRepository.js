

class RecipeRepository {
  constructor(recipeData, ingData) {
    this.recipeData = recipeData;
    this.ingredientData = ingData;
  };
  
  filterByNameOrIng(nameOrIng) {
    // 1. create empty array that will hold recipes we want to display (from search)
    // 2. get the ids of the ingredients that match the search term
    // 3. check recipe data, push any recipe to recipesToShow if it's ing list
    //    includes an ing from ingredientsToShow
    // 4. check recipe name, push any recipe to recipesToShow if it's
    //    name includes the search term
    //        * only if it has not already been added to recipesToShow
    // 5. return recipesToShow
    // console.log(this.recipeData)
    const recipesToShow = [];
    const ingredientID = this.getIngredientID(nameOrIng); //array of numbers (ids)
    const recipesWithIngID = this.recipeData.filter((recipe) => {
      // 1. check each recipe's ingredients array (check id property of ingredient)
      //    recipe properties: id, image, ingredients (array), instructions, name, tags
      // 2. if any of the ingredients in the list has an id that matches any of
      //    the ids from ingredientsToShow array, return that recipe in the new array

      // array of ids for each ing in the recipe
      let recipeIngIds = recipe.ingredients.map((ingredient) => {
        return ingredient.id;
      });
      return recipeIngIds.includes(ingredientID[0])
      // add this recipe to new array if recipeIngIds includes any number from ingredientsToShow
    });

    // add recipes from recipesWithIngID to recipesToShow array
    let addRecipes = () => {
      recipesWithIngID.forEach(recipe => {
        recipesToShow.push(recipe)
      })
    };
    addRecipes();

    let matchingNames = this.recipeData.filter((recipe) => {
      console.log(recipe.name)
      return recipe.name.toLowerCase().includes(nameOrIng.toLowerCase());
    })
    
    let recipesToShowNamez = recipesToShow.map((recipe) => {
      return recipe.name.toLowerCase();
    })

    let recipesToAdd2 = matchingNames.filter(recipe => {
      return !recipesToShowNamez.includes(recipe.name);
    })

    let addRecipesByName = () => {
      recipesToAdd2.forEach(recipe => {
        recipesToShow.push(recipe)
      })
    };
    addRecipesByName();


    // console.log(recipesToShow)
    return recipesToShow

    // console.log(matchingNames)

    // 4. check recipe name, push any recipe to recipesToShow if it's
    //    name includes the search term
    //        * only if it has not already been added to recipesToShow
    // 5. return recipesToShow
    // console.log(recipesWithIngID)


    // console.log(recipesToShow);
  //filter recipes and only return if it includes any of the ids from ingList
  // const checkRecipesByIng = this.recipeData.filter((element) => {
  //   return idList.includes(element.id)
  // });
  // // this var is the filtered list of recipes that include the ing name that was passed in
  // const recipesToReturn = checkRecipesByIng();

 // check for name:

  }

  checkForIds(ingId, idsToCheckFor) {
    let included = false;
    idsToCheckFor.forEach(id => {
      if (id === ingId)
      included = true;
    })
    return included;
  }

  // this function works!!!!
  getIngredientID(ingName) {
    const ingNameLC = ingName.toLowerCase();
    const ingredientsFromSearch = this.ingredientData.filter((ingredient) => {
      return ingredient.name === ingNameLC;
    });
    //array of ing objects with properties: name, id, cost
    const ingredientID = ingredientsFromSearch.map((ingredient) => {
      return ingredient.id;
    });
    return ingredientID;
  };
};

export default RecipeRepository;

// // check for ingredient:
// console.log(ingArray)
// //function that searches ing array and returns array of ids
// let getIDfromName = ingArray.filter((element) => {
//     return element.name.includes(nameOrIng)
//   });
// //call function from above and store arry in var idList
// let idList = getIDfromName().map((element) => {
//   return element.id
// })
