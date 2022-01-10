let userAPI = fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())

let ingredientAPI = fetch("http://localhost:3001/api/v1/ingredients")
  .then(response => response.json())

let recipeAPI = fetch("http://localhost:3001/api/v1/recipes")
  .then(response => response.json())

let post = async(info) => {
 let response = await fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response;
}

export {userAPI, ingredientAPI, recipeAPI, post}
