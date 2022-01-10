# What's Cookin'? 

Hungry and not sure what to cook tonight? You're in luck! 'What's Cookin' is an easy-to-use web app for organizing all your favorite recipes in one place.

---------------------------------------

## Overview

On the landing page, a randomized user will see all available recipes displayed. From here, the user can search a keyword or add a filter to narrow down the recipes that are displayed. When a keyword is entered in the search bar and the "search" button is clicked, any recipe with the keyword included in its name or ingredient list will appear. The user can also select one or multiple filters, which will update the displayed recipes when the "apply filter" button is clicked. If a user clicks the "favorite" button on a recipe card, that recipe will be added to the "my favorites" page. When the user goes to the "my favorites" page, they can search and filter their favorite recipes, and remove a recipe from favorites by deselecting the "favorite" button.

The user has access to their own personal pantry when the "my pantry" button is clicked where they are able to modify pantry contents by either adding a new ingredient via the dropdown menu or by adding or subtracting the quantity of an ingredient that currently exists in their pantry. The user may click on any single recipe for more details such as instructions, ingredients and cost of ingredients. If the user needs additional ingrdients to cook a recipe, the missing ingredients list and quantities will be listed. They can choose to cook that recipe if they have enough ingredients (and their respective quantities) in their pantry. 

---------------------------------------

## Installation Instructions
- fork this project to your own Github account
- clone the repository to your local machine
- `cd` into `whats-cookin`
- run `npm install` 
- run `npm start` 
- use [http://localhost:8080/](http://localhost:8080) to open application in browser 
  - address is specified in user webpage configuration

---------------------------------------

## Project Goals

- Use ES6 class syntax to create classes that communicate to each other as needed
- Use object and array prototype methods to perform data manipulation
- Create a user interface that is easy to use and clearly displays information
- Write modular, reusable code that follows SRP (Single Responsibility Principle)
- Implement a robust testing suite using TDD (Test Driven Development)
- Make network requests to retrieve data

---------------------------------------

### Introduction
On page load, a random user is generated, along with all of the current items in their pantry. Pre-loaded recipes are displayed on the home page, where a user can search, filter, favorite, and add recipes to the 'my cookbook' or 'my favorites' page. All recipe, ingredient, and user data is fetched from corresponding APIs. 

<img width="1438" alt="Screen Shot 2021-12-13 at 3 36 43 PM" src="https://user-images.githubusercontent.com/78453792/145901951-52832b77-6330-411b-98f4-ff2dbcee5cbb.png">

### Directions and Features

On page load the user will see all of the available recipe cards. The site can be navigated with the navigation bar at the top of the page, which holds the search bar and the "my favorites" and "my cookbook" buttons, and the filter section on the left of the page.

### Search

By clicking the search button, a user will see the results of their search input. Searches can include the entire or partial name of a recipe name or ingredient.

![searchrecipes-min](https://user-images.githubusercontent.com/78453792/145901802-5c72cd84-dc60-4f9a-aac8-98aced35b490.gif)

### Filter

By checking recipe catagories and then clicking the filter button, a user will see the results of recipes that match the catagories searched. 

![filter-min (1)](https://user-images.githubusercontent.com/78453792/145901770-b259a3bc-ebd3-43d2-987c-a197798e4d2b.gif)

### View Single Recipe

When a user clicks on of the recipe cards displayed on the page, they will be redirected to a single recipe page revealing the full recipe details. This includes the recipe ingredients, recipe instructions, cost for all ingredients (if you thought Whole Foods was expensive, watch out...).

![singlerecipeview-min](https://user-images.githubusercontent.com/78453792/145901917-67966355-7776-4ebe-a8c3-233923f40ef0.gif)

### My Favorites

When a user selects the "favorite" button on a recipe card, the selected recipe will be added to the "my favorites" page which can be found on the navigation bar. Upon clicking the "favorite" button again, the recipe will be removed from the "my favorites" page.

![favoriterecipes-min](https://user-images.githubusercontent.com/78453792/145901440-03f5df0a-42b0-4a30-8b81-e51c8e1e21b4.gif)

### My Cookbook

When a user is viewing a recipe's detailes, they have the option to select the "add to cookbook" button. This will add the selected recipe to the "my cookbook" page, which can be found on the navigation bar. This page is used to store recipes a user plans to cook in the future.

![addtocookbook (2)](https://user-images.githubusercontent.com/78453792/145901025-bfec8a69-13f1-4e39-9b1c-11e3e3f8eee2.gif)

### Adding and Removing From Pantry

### Cooking Recipe

---------------------------------------

## Project Challenges

- This was our team's first time working with the following technology and concepts, which naturally came with a learning curve as we implemented them into our project:
    - External data sets
    - Using API Fetch calls to pull in the data
    - Writing our own tests in order to follow TDD - we have previously followed pre-existing tests when building projects
    - This is the first iteration of our project and was completed in one week and the time constraint was limiting

---------------------------------------

## Project Wins

- Created a fully funtional MVP even with a limiting time scope of one week
- Successfully implemented API fetch calls
- Completed a thorough project plan and wireframe, which kept our team on track 
- Utilized a GitHub project board for the first time

---------------------------------------

## Technologies Used

- JavaScript
- CSS3
- SASS
- HTML5
- NPM
- ESLint
- webpack
- Fetch API


---------------------------------------

## Authors

- [Katie Ammon](https://github.com/kammon10)
- [Cesare Gallo](https://github.com/cagallo)
- [Lexy Newby](https://github.com/anewb87)
- [Ali Roemhildt](https://github.com/aliroemhildt)
- Code review by: [Kristen Bair](https://github.com/kristenmb)
