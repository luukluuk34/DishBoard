import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityService } from "src/app/core/common/entity.service";
import { environment } from "src/environments/environment";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService extends EntityService<Recipe>{
    constructor(http:HttpClient){
        super(http, environment.API_BASE_URL, "/recipe");
    }
}
