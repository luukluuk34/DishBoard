import { Entity } from "../../../core/common/entity.model";
import { Nutrition } from "../nutrition/nutrition.model";

export class Ingredient extends Entity{
    name:string;
    amount:string;
    size:string;
    nutrition: Nutrition;

    constructor(id = 0,name = "", amount = "",size = "", nutrition:Nutrition){
        super(id);
        this.name = name;
        this.amount = amount;
        this.size = size;
        this.nutrition = nutrition;
    }
}