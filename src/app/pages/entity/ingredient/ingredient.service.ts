import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityService } from "src/app/core/common/entity.service";
import { environment } from "src/environments/environment";
import { Ingredient } from "./ingredient.model";

@Injectable()
export class IngredientService extends EntityService<Ingredient>{
    constructor(http:HttpClient){
        super(http, environment.API_BASE_URL, "/ingredient");
    }
}
