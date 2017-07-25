import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe-service';
import { ShoppingListService } from '../../services/shopping-list-service';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipeSrvc: RecipeService,
    public shoppingSrvc: ShoppingListService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.index
    });
  }

  onAddIngredients() {
    this.shoppingSrvc.addIngredients(this.recipe.ingredients);
    this.showDropdownAlert(this.recipe.ingredients.length);
  }

  onDeleteRecipe() {
    const alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete this Recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.recipeSrvc.removeRecipe(this.index);
            this.navCtrl.popToRoot();
          }
        }
      ]
    })
    alert.present();
  }

  showDropdownAlert(count: number) {
    const toast = this.toastCtrl.create({
      message: count + ' ingredients added to Shopping List',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
