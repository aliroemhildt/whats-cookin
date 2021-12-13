import {expect} from 'chai';
import Ingredient from '../src/classes/Ingredient';
import ingredientsData from '../src/data/ingredients';

describe('Ingredient', () => {
  let sampleIngredient;

  beforeEach(() => {
    sampleIngredient = new Ingredient(ingredientsData[0])
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredients', () => {
    expect(sampleIngredient).to.be.an.instanceof(Ingredient);
  });

  it('should take in a parameter of ingredients data', () => {
    expect(sampleIngredient).to.deep.equal(ingredientsData[0]);
  });

});
