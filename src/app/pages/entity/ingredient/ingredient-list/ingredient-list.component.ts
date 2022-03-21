import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  ingredientList:Ingredient[] = [];
  

  constructor(private ingredientService:IngredientService) { 

  }

  ngOnInit(): void {
    console.log("GetList", this.ingredientService.getList().subscribe((results) => this.ingredientList = results));
  }

}
