import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import sampleData from '../src/data/sampleData';
import sampleIngredients from '../src/data/sampleIngredients';

describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(sampleData[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.deep.equal(sampleData[0].id);
  });

  it('should have an image', () => {
    expect(recipe.image).to.equal(sampleData[0].image);
  });

  it('should have an ingredients property', () => {
    expect(recipe.ingredients).to.deep.equal(sampleData[0].ingredients);
  });

  it('should have an instructions property', () => {
    expect(recipe.instructions).to.deep.equal(sampleData[0].instructions);
  });

  it('should have a name property', () => {
    expect(recipe.name).to.deep.equal(sampleData[0].name);
  });

  it('should have a tags property', () => {
    expect(recipe.id).to.deep.equal(sampleData[0].id);
  });

  it('should have a method to determine the names of ingredients', () => {
    let ingredients = recipe. determineRecipeIngredients(sampleIngredients)
    expect(ingredients).to.deep.equal(['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose', 'instant vanilla pudding', 'brown sugar', 'salt', 'fine sea salt', 'semi sweet chips', 'unsalted butter', 'vanilla']);
  });

  it('should get the cost of its ingredients', () => {
    expect(recipe.calculateRecipeCostInDollars(sampleIngredients)).to.equal(177.76);
  });

  it('should return its instructions', () => {
    let instructions = recipe.returnInstructions()
    expect(instructions[0]).to.equal('Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.');
  });

});
