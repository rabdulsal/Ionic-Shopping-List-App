import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from '../../services/shopping-list-service';
import { Ingredient } from '../../models/ingredient';
import {
  PopoverController,
  LoadingController,
  AlertController } from "ionic-angular";
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService) { }

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
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          // Refactor
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      if (list) {
                        this.listItems = list;
                      } else {
                        this.listItems = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        } else if (data.action == 'store') {
          loading.present();
          // Refactor
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        }
      }
    )
  }

  private loadIngredients() {
    this.listItems = this.slService.getIngredients();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
