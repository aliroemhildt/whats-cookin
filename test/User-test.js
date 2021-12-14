import { expect } from 'chai';
import User from '../src/classes/User';
import sampleData from '../src/data/sampleData';
import sampleUser from '../src/data/sampleUser';
import sampleIngredients from '../src/data/sampleIngredients';

describe('User', () => {
  let firstUser;

  beforeEach(() => {
    firstUser = new User(sampleUser[0], sampleIngredients)
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(firstUser).to.be.an.instanceof(User);
  });

  it('should be able to favorite a recipe', () => {
    firstUser.addToFavorites(sampleData[0]);

    expect(firstUser.favorites).to.deep.equal([sampleData[0]]);
  });

  it('should be able to remove a recipe from favorites', () => {
    firstUser.addToFavorites(sampleData[0]);
    firstUser.addToFavorites(sampleData[5]);
    firstUser.addToFavorites(sampleData[8]);
    firstUser.removeFromFavorites(sampleData[0]);

    expect(firstUser.favorites).to.deep.equal([sampleData[5], sampleData[8]]);
  });

  it('should be able to add a recipe to recipes to cook', () => {
    firstUser.addToRecipesToCook(sampleData[0]);

    expect(firstUser.recipesToCook).to.deep.equal([sampleData[0]]);
  });

  it('should be able to remove a recipe from recipes to cook', () => {
    firstUser.addToRecipesToCook(sampleData[0]);
    firstUser.addToRecipesToCook(sampleData[5]);
    firstUser.addToRecipesToCook(sampleData[8]);
    firstUser.removeFromRecipesToCook(sampleData[0]);

    expect(firstUser.recipesToCook).to.deep.equal([sampleData[5], sampleData[8]]);
  });

  it('should be able to filter favorite recipes by one or more tags', () => {
    firstUser.addToFavorites(sampleData[0]);
    firstUser.addToFavorites(sampleData[5]);
    firstUser.addToFavorites(sampleData[8]);

    expect(firstUser.filterFavoritesByTag('dinner')).to.deep.equal([sampleData[8]]);
  });

  it('should be able to filter favorite recipes by recipe name', () => {
    firstUser.addToFavorites(sampleData[0]);
    firstUser.addToFavorites(sampleData[5]);
    firstUser.addToFavorites(sampleData[8]);

    expect(firstUser.filterFavoritesByName('chocolate')).to.deep.equal([sampleData[0]]);
  });

  it('should be able to filter favorite recipes by ingredient name', () => {
    firstUser.addToFavorites(sampleData[0]);
    firstUser.addToFavorites(sampleData[5]);
    firstUser.addToFavorites(sampleData[8]);

    expect(firstUser.filterFavoritesByName('vanilla')).to.deep.equal([sampleData[0], sampleData[5]]);
  });
})
