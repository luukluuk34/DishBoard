import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../user/authentication.service';
import { Role, User } from '../../user/user.model';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredientList:Ingredient[] = [];
  isRouteSelected!:Boolean;
  currentUser$:Observable<User | undefined>;
  currentUser!:User|undefined;
  accessRole:Role = Role.ADMIN;
  token!:string | string[];

  @Output() newIngredientEvent = new EventEmitter<Ingredient>();
  @Output() deleteIngredientEvent = new EventEmitter<Ingredient>();

  constructor(private ingredientService:IngredientService, private router:Router, private auth:AuthenticationService){
    this.currentUser$ = this.auth.currentUser$;
    this.currentUser$.subscribe((user)=> this.currentUser = user);
    this.auth.getTokenFromLocalStorage().subscribe((element) => this.token = element);
    
  }

  ngOnInit(): void {
    if(this.router.url.includes('/ingredient-form')){
      this.isRouteSelected = true;
    }
    console.log("GetList", this.ingredientService.getList().subscribe((results) => this.ingredientList = results));
  }

  selectIngredient(index:number){
    var element = document.getElementsByClassName('ingredientBox')[index];

    if(element.classList.contains("ingredientSelected")){
      element.classList.remove("ingredientSelected");
      this.deleteIngredientEvent.emit(this.ingredientList[index]);
    }else{
      element.classList.add("ingredientSelected");
      this.newIngredientEvent.emit(this.ingredientList[index]);
    }
  }

  deleteIngredient(ingredient:Ingredient){
    console.log(this.ingredientService.delete(ingredient._id, this.sendHeaders()).subscribe());
  }

  updateIngredient(ingredient:Ingredient){
    this.router.navigate([`/ingredient-form/${ingredient._id}`]);
  }

  sendHeaders() : HttpHeaders{
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`)
    return header;
  }


}

