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

  it('should hold all the info for a recipe', () => {
    expect(recipe).to.deep.equal(recipeData[0]);
  })

  it('should have an id', () => {
      expect(recipe).to.have.property('id').value
  })

  it('should have an ingredients property', () => {
    expect(recipe).to.have.property('ingredients').value
  })

  it('should have an instructions property', () => {
    expect(recipe).to.have.property('instructions').value
  })

  it('should have a name property', () => {
    expect(recipe).to.have.property('name').value
  })

  it('should have a tags property', () => {
    expect(recipe).to.have.property('id').value
  })

  it('should have a method to determine the names of ingredients', () => {
    expect(recipe.determineIng).to.deep.equal([])
  }) 

  it('should get the cost of its ingredients', () => {
    expect(recipe.calculateRecipeCost).to.equal('suprise value!!')
  })

  it('should return its instructions', () => {
    expect(recipe.getInstructions).to.equal('stuff...{}?')
  })
    
})

