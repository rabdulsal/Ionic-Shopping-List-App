import { Ingredient } from '../models/ingredient';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // new ES6 function
  }

  removeIngredient(igIndex: number) {
    this.ingredients.splice(igIndex, 1);
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
