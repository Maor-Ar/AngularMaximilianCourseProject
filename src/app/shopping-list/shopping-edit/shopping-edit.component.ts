import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  // @ViewChild('nameInput',{static: false}) nameInputRef; 
  // @ViewChild('amountInput',{static: false}) amountInputRef; 
  sub: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f',{static: false}) slForm: NgForm;

  constructor(private slService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.slService.statedEditing.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
    });
  }
  onAddItem(f: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = f.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode) 
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    else
      this.slService.addIngredient(newIngredient);
    this.editMode = false;
    f.reset();
  }

  clearForm(f: NgForm){
    this.editMode = false;
    f.reset();
  }
  
  deleteIngredient(f: NgForm){
    this.slService.removeItem(this.editedItemIndex);
    this.editMode = false;
    f.reset();
  }
}
