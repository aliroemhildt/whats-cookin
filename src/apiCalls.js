let userAPI = fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())

let ingredientAPI = fetch("http://localhost:3001/api/v1/ingredients")
  .then(response => response.json())

let recipeAPI = fetch("http://localhost:3001/api/v1/recipes")
  .then(response => response.json())

export {userAPI, ingredientAPI, recipeAPI}
