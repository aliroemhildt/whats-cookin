let userAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then(response => response.json())
  // .then(data => data.usersData)

let ingredientAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(response => response.json())
  // .then(data => data.ingredientsData)

let recipeAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
.then(response => response.json())
// .then(data => data.recipeData)


export {userAPI, ingredientAPI, recipeAPI}
