import { expect } from 'chai';
import User from '../src/classes/User';
import userData from '../src/data/users';

describe('User', () => { 
    let usersData;
    let firstUser;

    beforeEach(() => {
        usersData = [
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

    })
//user access list of recipes 
//user click on recipe for directions/ingredients/total cost
//user filters recipes by multi tags
//user searches rcipes by name or ingredient