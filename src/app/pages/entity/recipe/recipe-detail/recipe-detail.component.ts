import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  providers:[RecipeService,UserService],
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  _id:string | null;
  user:User | null;
  constructor(private route: ActivatedRoute, private recipeService : RecipeService,private userService:UserService) { 
    this.recipe = new Recipe();
    this._id = "";
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this._id = params.get("id");
      console.log("Recipe from param", this.recipeService.getById(this._id)
      .subscribe((result) => {
        this.recipe = result;
        this.userService.getById(result.user_id)
          .subscribe((result) => this.user = result);
      }));
    });
    
  }

}
