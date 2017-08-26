import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import 'rxjs/Rx';

@Injectable()

export class RecipeService {
  private recipes: Recipe[] = [];

  constructor(
    private http: Http,
    private authService: AuthService){}
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

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-recipe-book-ed6d3.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
      .map((response: Response) => response.json());
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipe-book-ed6d3.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json() ? response.json() : [];
        for (let item of recipes) {
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }
}
