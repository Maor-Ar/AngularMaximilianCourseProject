import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  statedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 8),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientsChanged = new Subject <Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(i:number){
    return this.ingredients[i];
  }

  updateIngredient(index: number, ingredient: Ingredient)
  {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeItem(index: number){
    this.ingredients.splice(index,1)
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  constructor() { }
}
