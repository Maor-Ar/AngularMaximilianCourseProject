import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute , private recipesService: RecipeService , private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      const recipe = this.recipesService.getRecipes()[this.id];
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients)
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }));
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,[Validators.required]),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': recipeIngredients

    });

  }
  onAddIngredient() {
    const name = new FormControl(null,Validators.required);
    const amount = new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]);
    const controlArray = new FormGroup({"name":name,"amount":amount});
    (<FormArray>this.recipeForm.get('ingredients')).push(controlArray);
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    let ingredientsArr: Ingredient[] = [];
    const ingredientControls = this.recipeForm.get('ingredients').value;
    // for(let )
    const recipe = new Recipe(this.recipeForm.get('name').value,
                              this.recipeForm.get('description').value,
                              this.recipeForm.get('imagePath').value,
                              this.recipeForm.get('ingredients').value)
    if(this.editMode)
      this.recipesService.updateRecipe(this.id,recipe)
    else
    this.recipesService.addRecipe(recipe)
    
    this.router.navigate(['..'],{relativeTo: this.route, queryParamsHandling: 'preserve'})
  }
}
