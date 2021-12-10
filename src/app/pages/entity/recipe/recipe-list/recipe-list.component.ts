import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../user/authentication.service';
import { User } from '../../user/user.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[] = [];


  constructor(private route :ActivatedRoute, private recipeService: RecipeService) { 
  
  }

  ngOnInit(): void {
    console.log("GetList", this.recipeService.getList().subscribe((results) => this.recipeList = results));
  }



}
