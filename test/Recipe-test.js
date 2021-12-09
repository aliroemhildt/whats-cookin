import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import recipeData from '../src/data/recipes';
import ingredientsData from '../src/data/ingredients';


describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(recipeData[0]);
   
  })
  
  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe Repository', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

//   it.skip('should hold all the info for a recipe', () => {
//     expect(recipe).to.deep.equal(recipeData[0]);
//   })

  it('should have an id', () => {
    expect(recipe.id).to.deep.equal(recipeData[0].id)
     
  })

  it('should have an ingredients property', () => {
    expect(recipe.ingredients).to.deep.equal(recipeData[0].ingredients)
  })

  it('should have an instructions property', () => {
    expect(recipe.instructions).to.deep.equal(recipeData[0].instructions)
  })

  it('should have a name property', () => {
    expect(recipe.name).to.deep.equal(recipeData[0].name)
  })

  it('should have a tags property', () => {
    expect(recipe.id).to.deep.equal(recipeData[0].id)
  })

  it.only('should have a method to determine the names of ingredients', () => {
    let ingredients = recipe.determineIng(ingredientsData)
    expect(ingredients).to.deep.equal(['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose', 'instant vanilla pudding', 'brown sugar', 'salt', 'fine sea salt', 'semi sweet chips', 'unsalted butter', 'vanilla'])
  }) 

  it.skip('should get the cost of its ingredients', () => {
    expect(recipe.calculateRecipeCost).to.equal('suprise value!!')
  })

  it.skip('should return its instructions', () => {
    expect(recipe.getInstructions).to.equal('[{...}]')
  })
    
})

