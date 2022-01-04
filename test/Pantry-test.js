import { expect } from 'chai';
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
    expect(user.pantry).to.be.a('function');
  });
 
  it('should be an instance of User', () => {
    expect(user.pantry).to.be.an.instanceof(Pantry);
  });

  it ('should be able store a users ingredients', () => {
    expect(user.pantry.ingredients).to.deep.equal(sampleUser[0].pantry);
  });

  it ('should check if user has enough ingredients to cook a given meal', () => {
    expect(user.pantry.checkPantry(recipe)).to.be(true)))
    expect(user.pantry.checkPantry(recipe)).to.be(true)))

  })
})