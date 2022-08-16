import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: null
})
export class RecipeService {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Shakshuka",
      "Shakshuka is an easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa. It’s a simple combination of simmering tomatoes, onions, garlic, spices and gently poached eggs",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
      [new Ingredient('Egg',3),
      new Ingredient('Tomato',4),
      new Ingredient('Onion',1),
      new Ingredient('garlic',1)]),

      new Recipe(
        "Spicy Shakshuka",
        "Shakshuka is an easy, healthy breakfast (or any time of day) recipe in Israel and other parts of the Middle East and North Africa. It’s a simple combination of simmering tomatoes, onions, garlic, spices and gently poached eggs",
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
        [new Ingredient('Egg',3),
        new Ingredient('Tomato',4),
        new Ingredient('Onion',1),
        new Ingredient('Garlic',1),
        new Ingredient('Hot Pepper',1)]),
    ];
  recipeSelected = new Subject<Recipe>();
  constructor(private slService: ShoppingListService) { }
  getRecipes(){
    return this.recipes.slice();
  }
  addIngredientsToSl(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  addRecipe(newRecipe: Recipe): void{
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.getRecipes());
  }
  updateRecipe(index: number,updatedRecipe: Recipe){
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.getRecipes());
  }
  removeRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.getRecipes());
  }
}
