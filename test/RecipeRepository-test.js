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

  it('should be able to add all recipes from recipeData to the recipesToShow property', () => {
    repository.addAllRecipesToRecipesToShow();

    expect(repository.recipesToShow).to.deep.equal(repository.recipeData);
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

  it('should return a list of recipes based on its ingredient', () => {
    let recipesByIng = repository.filterByIng('brown sugar', ingredientsData, recipeList);

    let recipe1 = recipeList[0];
    let recipe2 = recipeList[2];
    let recipe3 = recipeList[6];
    let recipe4 = recipeList[8];

    let recipesTest = [recipe1, recipe2, recipe3, recipe4];

    expect(recipesByIng).to.deep.equal(recipesTest);
  });

  it('should be able to filter by name or ingredient and store result', () => {
    repository.filterByNameOrIng('coconut', ingredientsData, recipeList);
    expect(repository.recipesToShow).to.deep.equal([recipeList[6]]);

    repository.filterByNameOrIng('pineapple', ingredientsData, recipeList);
    expect(repository.recipesToShow).to.deep.equal([recipeList[8]]);

    repository.filterByNameOrIng('rapini', ingredientsData, recipeList);
    expect(repository.recipesToShow).to.deep.equal([recipeList[9]]);
  });

});
