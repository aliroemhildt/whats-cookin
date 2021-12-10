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
  });

  it('should have a default value of an empty array for its recipesToShow property', () => {
    expect(repository.recipesToShow).to.deep.equal([]);
  });

  it('should be able to add all recipes from recipeData to the recipesToShow property', () => {
    repository.addAllRecipesToRecipesToShow();

    expect(repository.recipesToShow).to.deep.equal(repository.recipeData);
  });

  it('should return a list of recipes based on a single tag', () => {
    let recipesByTag = repository.filterByTags(['sauce']);

    expect(recipesByTag).to.deep.equal([sampleData[2]]);
  });

  it('should return a list of recipes based on mutliple tags', () => {
    let recipesByTag = repository.filterByTags(['sauce', 'snack']);

    expect(recipesByTag).to.deep.equal([sampleData[0], sampleData[2], sampleData[7]]);
  });

  it('should be able to take in an ingredient name and return the corresponding ID for that ingredient', () => {
    const ingID = repository.getIngredientID('wheat flour', ingredientsData);

    expect(ingID).to.deep.equal(20081)
  });

  it('should return a list of recipes based on its name', () => {
    let recipesByName = repository.filterByName('Loaded Chocolate Chip Pudding Cookie Cups', ingredientsData);

    let recipesTest = [sampleData[0]];

    expect(recipesByName).to.deep.equal(recipesTest);
  });

  it('should return a list of recipes based on its ingredient', () => {
    let recipesByIng = repository.filterByIng('brown sugar', ingredientsData);

    let recipe1 = sampleData[0];
    let recipe2 = sampleData[2];
    let recipe3 = sampleData[6];
    let recipe4 = sampleData[8];

    let recipesTest = [recipe1, recipe2, recipe3, recipe4];

    expect(recipesByIng).to.deep.equal(recipesTest);
  });

  // these test to make sure we are not adding duplicates, we can choose one I just wanted to try multiple cases
  it('should be able to filter by name or ingredient and store result', () => {
    repository.filterByNameOrIng('coconut', ingredientsData);
    expect(repository.recipesToShow).to.deep.equal([sampleData[6]]);

    repository.filterByNameOrIng('pineapple', ingredientsData);
    expect(repository.recipesToShow).to.deep.equal([sampleData[8]]);

    repository.filterByNameOrIng('rapini', ingredientsData);
    expect(repository.recipesToShow).to.deep.equal([sampleData[9]]);
  })
});
