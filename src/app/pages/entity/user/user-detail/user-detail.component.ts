import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { AuthenticationService } from '../authentication.service';
import { Observable, of } from 'rxjs';
import { RecipeBook } from '../../recipeBook/recipeBook.model';
import { RecipeBookService } from '../../recipeBook/recipeBook.service';
import { HttpHeaders } from '@angular/common/http';
import { Recipe } from '../../recipe/recipe.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {
  user : User;
  _id : string | null;
  loggedInUser!:User;
  userList: User[] = [];
  recipeBooks!:RecipeBook[];
  token!:string | string[];
  followedBooks:RecipeBook[] = [];

  constructor(private route: ActivatedRoute, private userService : UserService, private auth:AuthenticationService, private recipeBookService:RecipeBookService, private router:Router) { 
    this.user = new User();
    this._id = "";
    this.auth.getTokenFromLocalStorage().subscribe((element) => this.token = element);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("Parameters are " + params['id'])
      this._id = params['id'] ?? '0';
    });
    this.userService.getById(this._id).subscribe((result) => {this.user = result, console.log(this.user)});
    this.recipeBookService.getByUserId(this._id).subscribe((res) => this.recipeBooks = res)
    this.auth.getUserFromLocalStorage().subscribe((res) => {this.loggedInUser = res, console.log("LoggedInUser",res)});
    this.getFollowRecipes();

    console.log(this.followedBooks)
  }

  ngOnDestroy(){
  }

  getFollowRecipes(){
    this.recipeBookService.getFollowing(this.loggedInUser._id).subscribe(result => {this.followedBooks = result, console.log(result[0])})
  }

  followRecipe(recipeBookId:RecipeBook){
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`)
    this.recipeBookService.followRecipeBook(this.loggedInUser,recipeBookId._id?.toString(), header).subscribe()
  }

  unFollowRecipe(recipeBookId:RecipeBook){
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`)
    this.recipeBookService.unFollowRecipeBook(this.loggedInUser,recipeBookId._id?.toString(), header).subscribe()
  }

  checkIfInArray(recipeBook:RecipeBook):boolean{
    for(let r of this.followedBooks){
      console.log(r)
      if(r == recipeBook){
        return true;
      }
    }
    return false;
  }

  deleteRecipebook(recipeBook:RecipeBook){
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${this.token}`)
    console.log(recipeBook)
    this.recipeBookService.delete(recipeBook._id,header).subscribe();
  }

  editRecipebook(recipeBook:RecipeBook){
    this.router.navigate([`/recipe-book-form/${recipeBook._id}`])
  }

}
