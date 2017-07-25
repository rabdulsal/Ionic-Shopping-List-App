import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';

export class RecipeService {
  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(
      title,
      description,
      difficulty,
      ingredients));
  }

  updateRecipe(
    recipeIdx: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]) {
    this.recipes[recipeIdx] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(recipeIdx: number) {
    this.recipes.splice(recipeIdx, 1);
  }
}
