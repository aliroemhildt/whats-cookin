class RecipeRepository {
  constructor(data) {
    this.recipeData = data;
  }

  filterByNameOrIng(nameOrIng, ingArray) {
  // check for ingredient:

  //function that searches ing array and returns array of ids
  let getIDfromName = ingArray.filter((element) => {
      return element.name.includes(nameOrIng)
    });
  //call function from above and store arry in var idList
  let idList = getIDfromName().map((element) => {
    return element.id
  })



  //filter recipes and only return if it includes any of the ids from ingList
  let checkRecipesByIng = this.recipeData.filter((element) => {
    return idList.includes(element.id)
  });
  // this var is the filtered list of recipes that include the ing name that was passed in
  let recipesToReturn = checkRecipesByIng();

 // check for name:

  }
};

export default RecipeRepository;
