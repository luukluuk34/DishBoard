import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  providers: [RecipeService],
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipe:Recipe;
  addRecipeForm!:FormGroup;
  _id!:string;
  index!:number;

  constructor(private recipeService:RecipeService, private router: Router, private route:ActivatedRoute) { 
    this.recipe = new Recipe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(paramId => {
      this._id = paramId['id'] ?? '0';
    });
    if(this._id === '0'){
      console.log("add")
    }else{
      console.log("update", this.recipeService.getById(this._id).subscribe((result) => this.recipe = result));
     }

    this.addRecipeForm = new FormGroup({
      name: new FormControl(this.recipe.name,Validators.required),
      time: new FormControl(this.recipe.time, Validators.required),
      forAmountOfPeople: new FormControl(this.recipe.forAmountOfPeople, Validators.required),
      description: new FormArray([new FormControl(this.recipe.description, Validators.required)]),
      tips: new FormControl(this.recipe.tips, Validators.required),
      imgUrl: new FormControl(this.recipe.imgUrl, Validators.required),
      user_id: new FormControl(this.recipe.user_id, Validators.required)
    })
    this.addRecipeForm.get('user_id')?.setValue("619e5501385941dcbfa0dfe7");
  }
  onSubmit(){
    console.log("On submit", this.addRecipeForm.value);
    if(this.addRecipeForm.invalid){
      return;
    }
    if(this.recipe?._id){
      console.log('updating user', this.recipe._id);
      //TODO add when editing is available
    }else{
      console.log('Adding user', this.addRecipeForm.value);
      this.recipeService.create(this.addRecipeForm.value).subscribe();
    }
    this.router.navigate(['/recipe-interface']);
  }

  description(): FormArray{
    return this.addRecipeForm.get('description') as FormArray;
  }

  addDescription(){
    this.description().push(new FormControl(this.recipe.description)); 
  }
  deleteDescription(index:number){
    this.description().removeAt(index);
  }

}
