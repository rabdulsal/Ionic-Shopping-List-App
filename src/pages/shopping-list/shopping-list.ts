import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from '../../services/shopping-list-service';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ionViewWillEnter() {
    this.loadIngredients();
  }

  onAddItem(form: NgForm) {
    this.slService.addIngredient(form.value.ingredientName, form.value.amount);
    form.reset(); // Empty form
    this.loadIngredients();
  }

  onCheckItem(index: number) {
    this.slService.removeIngredient(index);
    this.loadIngredients();
  }

  private loadIngredients() {
    this.listItems = this.slService.getIngredients();
  }

}
