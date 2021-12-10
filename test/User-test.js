import { expect } from 'chai';
import User from '../src/classes/User';
import userData from '../src/data/users';
import sampleData from '../src/data/sampleData';

describe('User', () => { 
  let userData, firstUser;

  beforeEach(() => {
    userData = [
      {
        "name": "Saige O'Kon",
        "id": 1,
        "pantry": [
          {
            "ingredient": 11297,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 10
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 6
          },
          {
            "ingredient": 1123,
            "amount": 8
          },
          {
            "ingredient": 11282,
            "amount": 4
          },
          {
            "ingredient": 6172,
            "amount": 2
          },
          {
            "ingredient": 2044,
            "amount": 2
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 5114,
            "amount": 3
          },
          {
            "ingredient": 1017,
            "amount": 2
          },
          {
            "ingredient": 18371,
            "amount": 7
          },
          {
            "ingredient": 1001,
            "amount": 6
          },
          {
            "ingredient": 99223,
            "amount": 2
          },
          {
            "ingredient": 1230,
            "amount": 2
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 10611282,
            "amount": 2
          },
          {
            "ingredient": 93607,
            "amount": 2
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 1077,
            "amount": 4
          },
          {
            "ingredient": 6150,
            "amount": 2
          },
          {
            "ingredient": 1124,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 4
          },
          {
            "ingredient": 1102047,
            "amount": 2
          },
          {
            "ingredient": 19206,
            "amount": 2
          },
          {
            "ingredient": 1145,
            "amount": 4
          },
          {
            "ingredient": 1002030,
            "amount": 4
          },
          {
            "ingredient": 12061,
            "amount": 2
          },
          {
            "ingredient": 19335,
            "amount": 4
          },
          {
            "ingredient": 15152,
            "amount": 3
          },
          {
            "ingredient": 9003,
            "amount": 2
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 2027,
            "amount": 2
          }
        ]
      }
    ]
    firstUser = new User(userData[0])
    // console.log(firstUser)
    // console.log(userData[0])
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });
    
  it('should be an instance of User', () => {
    expect(firstUser).to.be.an.instanceof(User);
  });

  it('should be able to favorite a recipe', () => {
    firstUser.addToFavorites(sampleData[0]); 

    expect(firstUser.favorites).to.deep.equal([sampleData[0]]);
  })

  it('should be able to remove a recipe from favorites', () => {
    firstUser.addToFavorites(sampleData[0]);
    firstUser.addToFavorites(sampleData[5]);
    firstUser.addToFavorites(sampleData[8]);
    firstUser.removeFromFavorites(sampleData[0]);

    expect(firstUser.favorites).to.deep.equal([sampleData[5], sampleData[8]]);
  })

  it('should be able to add a recipe to recipes to cook', () => {
    firstUser.addToRecipesToCook(sampleData[0]);

    expect(firstUser.recipesToCook).to.deep.equal([sampleData[0]]);
  })

  it('should be able to remove a recipe from recipes to cook', () => {
    firstUser.addToRecipesToCook(sampleData[0]);
    firstUser.addToRecipesToCook(sampleData[5]);
    firstUser.addToRecipesToCook(sampleData[8]);
    firstUser.removeFromRecipesToCook(sampleData[0]);

    expect(firstUser.recipesToCook).to.deep.equal([sampleData[5], sampleData[8]]);
  })

  it('should be able to filter favorite recipes by one or more tags', () => {
    firstUser.addToFavorites(sampleData[0]);
    firstUser.addToFavorites(sampleData[5]);
    firstUser.addToFavorites(sampleData[8]);
    // firstUser.filterFavoritesByTag('dinner');

    expect(firstUser.filterFavoritesByTag('dinner')).to.deep.equal([sampleData[8]]);
  })

//   it('should be able to filter favorite recipes by name', () => {
//     firstUser.addToFavorites(sampleData[0]);
//     firstUser.addToFavorites(sampleData[5]);
//     firstUser.addToFavorites(sampleData[8]);

//     expect(firstUser.filterFavoritesByName)
//   }))

})
//user access list of recipes 
//user click on recipe for directions/ingredients/total cost
//user filters recipes by multi tags
//user searches rcipes by name or ingredient