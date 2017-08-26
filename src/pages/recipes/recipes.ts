import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  PopoverController,
  LoadingController,
  AlertController} from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  allRecipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipeSrvc: RecipeService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadRecipes();
  }

  ionViewWillEnter() {
    this.loadRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, recipeIdx: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: recipeIdx});
  }

  loadRecipes() {
    this.allRecipes = this.recipeSrvc.getRecipes();
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
                this.recipeSrvc.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.allRecipes = list;
                      } else {
                        this.allRecipes = [];
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
                this.recipeSrvc.storeList(token)
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

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
