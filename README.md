# What's Cookin'? 

Hungry and not sure what to cook tonight? You're in luck! 'What's Cookin' is an easy-to-use web app for organizing all your favorite recipes in one place.


## Installation Instructions
- fork this project to your own Github account
- clone the repository to your local machine
- `cd` into `whats-cookin`
- run `npm install` 
- run `npm start` 
- use [http://localhost:8080/](http://localhost:8080) to open application in browser 
  - address is specified in user webpage configuration


## Introduction
On page load, a random user is generated, along with all of the current items in their pantry. Pre-loaded recipes are displayed on the home page, where a user can search, filter, favorite, and add recipes to their 'cookbook'. 


<img width="1438" alt="Screen Shot 2021-12-13 at 3 36 43 PM" src="https://user-images.githubusercontent.com/78453792/145901951-52832b77-6330-411b-98f4-ff2dbcee5cbb.png">


## Directions and Features

On page load the user will see user all of the recipe cards available in our recipe data file. The site can be navigated by the dark green navigation bar at the top of the page and the filter recipes side bar.

## Search

By clicking the search button, a user will see the results of their search input; searches can include recipe names or ingredients.

![searchrecipes-min](https://user-images.githubusercontent.com/78453792/145901802-5c72cd84-dc60-4f9a-aac8-98aced35b490.gif)

## Filter

By checking recipe catagories and then clicking the filter button, a user will see the results of recipes that match the catagories searched. 

![filter-min (1)](https://user-images.githubusercontent.com/78453792/145901770-b259a3bc-ebd3-43d2-987c-a197798e4d2b.gif)


## View Single Recipe

When a user clicks the recipe box displayed on page, they are redirected to a single recipe page revealing the full recipe including recipe ingredients, recipe cost, and recipe instructions.

![singlerecipeview-min](https://user-images.githubusercontent.com/78453792/145901917-67966355-7776-4ebe-a8c3-233923f40ef0.gif)


## My Favorites

When a user selects the "favorite" button on a recipe card, the selected recipe will be added to the My Favorites page which can be found on the navigation bar. Upon clicking the "favorite" button again, the recipe will be removed from the Favorite Recipes page.

![favoriterecipes-min](https://user-images.githubusercontent.com/78453792/145901440-03f5df0a-42b0-4a30-8b81-e51c8e1e21b4.gif)

## My Cookbook

When a user selects the "Add to Cookbook" button on the single recipe page, the selected recipe will be added to the My Cookbook Page which can be found on the navigation bar. This page is used to store recipes a user plans to cook in the future.

![addtocookbook (2)](https://user-images.githubusercontent.com/78453792/145901025-bfec8a69-13f1-4e39-9b1c-11e3e3f8eee2.gif)

---------------------------------------

### Technologies Used

- JavaScript
- CSS3
- HTML5
- NPM
- ESLint
- webpack
- Fetch API

---------------------------------------

### Authors

- [Katie Ammon](https://github.com/kammon10)
- [Cesare Gallo](https://github.com/cagallo)
- [Lexy Newby](https://github.com/anewb87)
- [Ali Roemhildt](https://github.com/aliroemhildt)
