import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe-service';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  allRecipes: Recipe[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public recipeSrvc: RecipeService) {

  }

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

}
