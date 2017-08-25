import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from '../../services/shopping-list-service';
import { Ingredient } from '../../models/ingredient';
import { PopoverController } from "ionic-angular";
import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController) { }

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

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(ShoppingListOptionsPage);
    popover.present({ev: event});
  }

  private loadIngredients() {
    this.listItems = this.slService.getIngredients();
  }

}
