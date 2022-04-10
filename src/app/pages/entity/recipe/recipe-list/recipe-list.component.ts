import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  addButtonToggle:Boolean = true;

  @Output() addRecipeEvent = new EventEmitter<{Recipe: Recipe,Chapter:number}>();
  @Input() recipeChapter = 0;
  constructor(private route :Router, private recipeService: RecipeService) { 
  
  }

  ngOnInit(): void {
    console.log("GetList", this.recipeService.getList().subscribe((results) => this.recipeList = results));

    if(this.route.url == '/recipe-interface'){
      this.addButtonToggle = false;
    }
  }

  selectRecipe(recipe:Recipe){
    this.addRecipeEvent.emit({Recipe:recipe, Chapter:this.recipeChapter});
  }



}
