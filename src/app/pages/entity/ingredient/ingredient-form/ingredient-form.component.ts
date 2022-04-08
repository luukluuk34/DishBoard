import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../user/user.model';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';
import { AuthenticationService } from '../../user/authentication.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  selectedIngredient!:Ingredient;
  _id!:string;

  addIngredientForm!:FormGroup;
  currentUser$:Observable<User | undefined>;
  token!:string | string[];

  constructor(private ingredientService:IngredientService, private router:Router,private route:ActivatedRoute, private auth:AuthenticationService) { 
    this.selectedIngredient = new Ingredient();
    this.currentUser$ = this.auth.currentUser$;
    this.auth.getTokenFromLocalStorage().subscribe((element) => this.token = element);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("Parameters are " + params['id'])
      this._id = params['id'] ?? '0';
    });

    if(this._id === '0'){
      console.log("add")
    }else{
      console.log(this._id);
      console.log("update", this.ingredientService.getById(this._id).subscribe((result) => {this.selectedIngredient = result, console.log(result)}));
      console.log("Ingredient: " + this.selectedIngredient)
    }

    this.addIngredientForm = new FormGroup({
      name: new FormControl(Validators.required),
      amount: new FormControl(Validators.required),
      size: new FormControl(Validators.required),
      substitudes: new FormArray([]),
    })
  }

  get substitudes(): FormArray{
    return this.addIngredientForm.get('substitudes') as FormArray;
  }

  onSubmit(){
    console.log(this.addIngredientForm);
    if(this.addIngredientForm.invalid){
      return;
    }
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`)
    if(this.selectedIngredient?._id){
      this.ingredientService.update(this.addIngredientForm.value,this.selectedIngredient._id,header).subscribe();
      this.router.navigate(['/recipe-form']);
    }else{
      this.ingredientService.create(this.addIngredientForm.value,header).subscribe();
      this.router.navigate(['/recipe-form']);
    }
  }

  addSubstitude(ingredient:Ingredient){
    this.substitudes.push(new FormControl(ingredient))
  }

  deleteSubstitude(ingredient:Ingredient){
    this.substitudes.controls.forEach((element,index)=>{
      if(element.value == ingredient){
        this.substitudes.removeAt(index);
      }
    });
  }

}
