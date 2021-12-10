import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  _id:string | null;
  recipeUser:User | null;
  currentUser$:Observable<User | undefined>
  currentUser:User|undefined;

  constructor(private route: ActivatedRoute, private recipeService : RecipeService,private userService:UserService,private auth:AuthenticationService, private router: Router) { 
    this.recipe = new Recipe();
    this._id = "";
    this.recipeUser = new User();
    this.currentUser$ = this.auth.currentUser$;
    this.currentUser$.subscribe((user) => this.currentUser = user);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this._id = params.get("id");
      console.log("Recipe from param", this.recipeService.getById(this._id)
      .subscribe((result) => {
        this.recipe = result;
        this.userService.getById(result.user_id)
          .subscribe((result) => this.recipeUser = result);
      }));
    });
    
  }

  deleteRecipe(){
    this.recipeService.delete(this.recipe._id).subscribe();
    this.router.navigate(['/recipe-interface']);
  }

}
