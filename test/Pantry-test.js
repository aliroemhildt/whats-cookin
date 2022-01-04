import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import User from '../src/classes/User';
import sampleData from '../src/data/sampleData';
import sampleIngredients from '../src/data/sampleIngredients';
import sampleUser from '../src/data/sampleUser';

describe('Pantry', () => {
  let user;

  beforeEach(() => {
    user = new User(sampleUser[0], sampleIngredients)
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user.pantry).to.be.an.instanceof(Pantry);
  });

  it('should be able store a users ingredients', () => {
    expect(user.pantry.ingredients).to.deep.equal(sampleUser[0].pantry);
  });

  it('should check if user has enough ingredients to cook a given meal', () => {
    const recipe1 = sampleData[0];
    const recipe2 = sampleData[1];
    expect(user.pantry.checkPantry(recipe1)).to.equal(true)
    expect(user.pantry.checkPantry(recipe2)).to.equal(false)
  });

  it('should return missing ingredients and amount for a given recipe', () => {
    const recipe1 = sampleData[0];
    const recipe2 = sampleData[1];
    expect(user.pantry.getMissingIngredients(recipe1)).to.deep.equal([]);
    expect(user.pantry.getMissingIngredients(recipe2)).to.deep.equal([
      {'ingredient': 1009016, 'amount': 1.5},
      {'ingredient': 20027, 'amount': 1},
      {'ingredient': 1002046, 'amount': 1},
      {'ingredient': 1012046, 'amount': 1},
      {'ingredient': 19911, 'amount': 0.25},
      {'ingredient': 16112, 'amount': 1},
      {'ingredient': 10010062, 'amount': 24},
      {'ingredient': 1102047, 'amount': 2},
      {'ingredient': 16124, 'amount': 1},
      {'ingredient': 1016168, 'amount': 1}
    ])
  });
})
