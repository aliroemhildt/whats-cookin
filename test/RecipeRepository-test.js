import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import ingredientsData from '../src/data/ingredients';
import sampleData from '../src/data/sampleData';

describe('RecipeRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new RecipeRepository(sampleData);
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(repository).to.be.an.instanceof(RecipeRepository);
  });

  it('should take in a parameter of recipe data', () => {
    expect(repository.recipeData).to.equal(sampleData);
  });

  it('should have a property that lists which recipes to show on the page, ', () => {
    expect(repository).to.have.property('recipesToShow');
  })

  it('should have a default value of an empty array for its recipesToShow property', () => {
    expect(repository.recipesToShow).to.deep.equal([]);
  })

  it('should return a list of recipes based on a single tag', () => {
    let recipesByTag = repository.filterByTags(['sauce']);
    expect(recipesByTag).to.deep.equal([sampleData[2]]);
  });

  it('should return a list of recipes based on mutliple tags', () => {
    let recipesByTag = repository.filterByTags(['sauce', 'snack']);
    expect(recipesByTag).to.deep.equal([sampleData[0], sampleData[2], sampleData[7]]);
  });

  it('should be able to take in an ingredient name and return an array containing that ingredients ID', () => {
    const getIngID = repository.getIngredientID('wheat flour', ingredientsData);
    expect(getIngID).to.deep.equal([20081])
  });

  it('should return a list of recipes based on its name', () => {
    const recipesByName = repository.filterByNameOrIng('Loaded Chocolate Chip Pudding Cookie Cups', ingredientsData);
    let recipe1 = sampleData[0];
    let recipesTest = [recipe1];

    expect(recipesByName).to.deep.equal(recipesTest);
  });

  it('should return a list of recipes based on its ingredient', () => {
    const recipesByIngredient = repository.filterByNameOrIng('brown sugar', ingredientsData);
    let recipe1 = sampleData[0];
    let recipe2 = sampleData[2];
    let recipe3 = sampleData[6];
    let recipe4 = sampleData[8];
    let recipesTest = [recipe1, recipe2, recipe3, recipe4];

    expect(recipesByIngredient).to.deep.equal(recipesTest);
  });

});
