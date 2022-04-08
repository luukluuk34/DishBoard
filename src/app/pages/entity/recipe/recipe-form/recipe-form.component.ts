import { HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ingredient } from '../../ingredient/ingredient.model';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipe:Recipe;
  addRecipeForm!:FormGroup;
  _id!:string;
  currentUser:User|undefined;
  currentUser$:Observable<User | undefined>;
  invalidForm:Boolean = false;
  token!:string | string[];

  constructor(private recipeService:RecipeService, private router: Router, private route:ActivatedRoute, private auth:AuthenticationService) { 
    this.recipe = new Recipe();
    this.currentUser$ = this.auth.currentUser$
    this.currentUser$.subscribe((user)=> this.currentUser = user);
    this.auth.getTokenFromLocalStorage().subscribe((element) => this.token = element);
  }

  ngOnInit(): void {
    this.route.params.subscribe(paramId => {
      this._id = paramId['id'] ?? '0';
    });
    if(this._id === '0'){
      console.log("add")
    }else{
      console.log(this._id);
      console.log("update", this.recipeService.getById(this._id).subscribe((result) => {this.recipe = result, console.log("In de sub",this.recipe)}));
      console.log(this.recipe)
     }

    this.addRecipeForm = new FormGroup({
      name: new FormControl(this.recipe.name,Validators.required),
      time: new FormControl(this.recipe.time, Validators.required),
      forAmountOfPeople: new FormControl(this.recipe.forAmountOfPeople, Validators.required),
      description: new FormArray([new FormControl(null,Validators.required)]),
      tips: new FormControl(this.recipe.tips, Validators.required),
      imgUrl: new FormControl(this.recipe.imgUrl, Validators.required),
      user: new FormControl(this.recipe.user, Validators.required),
      ingredients: new FormArray([])
    })
    this.addRecipeForm.get('user')?.setValue(this.currentUser);

  }
  onSubmit(){
    console.log("On submit", this.addRecipeForm.value);
    if(this.addRecipeForm.invalid){
      return;
    }
    if(this.description.length <= 0){
      this.invalidForm = true;
      return;
    }
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`)
    if(this.recipe?._id){
      this.recipeService.update(this.addRecipeForm.value,this.recipe._id,header).subscribe();
    }else{
      this.recipeService.create(this.addRecipeForm.value,header).subscribe();
    }
    this.router.navigate(['/recipe-interface']);
  }

  get description(): FormArray{
    return this.addRecipeForm.get('description') as FormArray;
  }

  get ingredients(): FormArray{
    return this.addRecipeForm.get('ingredients') as FormArray
  }

  addDescription(){
    this.description.push(new FormControl(null, Validators.required)); 
  }
  deleteDescription(index:number){
    this.description.removeAt(index);
  }

  populateDescription(){
    for(let i = 0; i < this.recipe.description.length - 1; i++){
      this.description.push(new FormControl(this.recipe.description[i]));
    }
  }

  addSubstitude(ingredient:Ingredient){
    this.ingredients.push(new FormControl(ingredient))
  }

  deleteSubstitude(ingredient:Ingredient){
    this.ingredients.controls.forEach((element,index)=>{
      if(element.value == ingredient){
        this.ingredients.removeAt(index);
      }
    });
  }

}
