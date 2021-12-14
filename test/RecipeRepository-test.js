import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import ingredientsData from '../src/data/ingredients';
import sampleData from '../src/data/sampleData';

describe('RecipeRepository', () => {
  let repository;
  let recipeList;

  beforeEach(() => {
    recipeList = sampleData.map(recipe => {
      return new Recipe(recipe);
    });
    repository = new RecipeRepository(recipeList);
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(repository).to.be.an.instanceof(RecipeRepository);
  });

  it('should take in a parameter of recipe data', () => {
    expect(repository.recipeData).to.equal(recipeList);
  });

  it('should have a property that lists which recipes to show on the page, ', () => {
    expect(repository).to.have.property('recipesToShow');
  });

  it('should have a default value of an empty array for its recipesToShow property', () => {
    expect(repository.recipesToShow).to.deep.equal([]);
  });

  it('should return a list of recipes based on a single tag', () => {
    repository.filterByTags(['sauce'], recipeList);

    expect(repository.recipesToShow).to.deep.equal([recipeList[2]]);
  });

  it('should return a list of recipes based on mutliple tags', () => {
    repository.filterByTags(['sauce', 'snack'], recipeList);

    expect(repository.recipesToShow).to.deep.equal([recipeList[0], recipeList[2], recipeList[7]]);
  });

  it('should be able to take in an ingredient name and return the corresponding ID for that ingredient', () => {
    const ingID = repository.getIngredientIDs('flour', ingredientsData);

    expect(ingID).to.deep.equal([20081, 20011, 20090, 11413, 93760, 93740, 10120129, 10020080, 10218364]);
  });

  it('should return a list of recipes based on its name', () => {
    let recipesByName = repository.filterByName('Loaded Chocolate Chip Pudding Cookie Cups', ingredientsData, recipeList);
    let recipesTest = [recipeList[0]];
    expect(recipesByName).to.deep.equal(recipesTest);
  });

  it('should return a list of recipes if their ingredient names include all or part of the searched word', () => {
    let recipesByIng1 = repository.filterByIng('sugar', ingredientsData, recipeList);
  
    let recipe1 = recipeList[0];
    let recipe2 = recipeList[2];
    let recipe3 = recipeList[6];
    let recipe4 = recipeList[8];

    let recipesTest1 = [recipe1, recipe2, recipe3, recipe4];

    expect(recipesByIng1).to.deep.equal(recipesTest1);

    let recipesByIng2 = repository.filterByIng('brown sugar', ingredientsData, recipeList);
  
    let recipe5 = recipeList[0];
    let recipe6 = recipeList[2];
    let recipe7 = recipeList[6];
    let recipe8 = recipeList[8];

    let recipesTest2 = [recipe5, recipe6, recipe7, recipe8];

    expect(recipesByIng2).to.deep.equal(recipesTest2);
  });

  it('should be able to filter by name or ingredient and store result', () => {
    repository.filterByNameOrIng('chocolate', ingredientsData, recipeList)
    
    expect(repository.recipesToShow).to.deep.equal([recipeList[6], recipeList[0]]);
  });
});
