import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { delay, Observable, switchMap, tap } from 'rxjs';
import { Recipe } from '../../recipe/recipe.model';
import { RecipeService } from '../../recipe/recipe.service';
import { Chapter, RecipeBook } from '../recipeBook.model';
import { RecipeBookService } from '../recipeBook.service';

@Component({
  selector: 'app-recipe-book-detail',
  templateUrl: './recipe-book-detail.component.html',
  styleUrls: ['./recipe-book-detail.component.css']
})
export class RecipeBookDetailComponent implements OnInit {
  recipeBook:RecipeBook;
  _id! : string | null;
  

  constructor(private recipeService:RecipeService,private recipeBookService:RecipeBookService, private route:ActivatedRoute ) { 
    this.recipeBook = new RecipeBook();
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this._id = params.get("recipeId");
      console.log("RecipeBook from param", this.recipeBookService.getById(this._id)
      .subscribe((result) => {
        this.recipeBook = result;
        this.recipeBookService.getById(this._id).subscribe(result => {
          this.recipeBook = result;
        });
      }));
    });
  }



  viewRecipe(chapter:Chapter){
    let tempRecipeList:Recipe[] = [];
    for(let r of chapter.recipeList){
      if(typeof r == 'string'){
        console.log("het is een string")
        this.recipeService.getById(r).subscribe((recipe) =>  tempRecipeList.push(recipe));
      } 
    }
    console.log(chapter.recipeList[0].name)
    if(chapter.recipeList[0].name == undefined){
      chapter.recipeList = tempRecipeList;
    }
  }
}
