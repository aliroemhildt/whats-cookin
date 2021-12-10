import {expect} from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients';

describe('Ingredients', () => {
  let ingredients;

  beforeEach(() => {
    ingredients = new Ingredient(ingredientsData)
  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  })

  it('should be an instance of Ingredients', () => {
    expect(ingredients).to.be.an.instanceof(Ingredient);
  });

  it('should take in a parameter of ingredients data', () => {
    expect(ingredients.ingredientsData).to.equal(ingredientsData);
  });

})