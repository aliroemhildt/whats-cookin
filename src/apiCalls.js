let userAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then(response => response.json())

let ingredientAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(response => response.json())

let recipeAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(response => response.json())

export {userAPI, ingredientAPI, recipeAPI}
