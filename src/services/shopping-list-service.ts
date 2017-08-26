import { Ingredient } from '../models/ingredient';
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth";
import 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  constructor(
    private http: Http,
    private authService: AuthService) {};

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

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://ionic-recipe-book-ed6d3.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipe-book-ed6d3.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients;
        } else {
          this.ingredients = [];
        }
      });
  }
}
