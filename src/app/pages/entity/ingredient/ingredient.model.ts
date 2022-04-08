import { Entity } from "../../../core/common/entity.model";

export class Ingredient extends Entity{
    name:string;
    amount:string;
    size:string;
    substitude?:Ingredient[];

    constructor(id = 0,name = "", amount = "",size = "",substitude?:Ingredient[]){
        super(id);
        this.name = name;
        this.amount = amount;
        this.size = size;
        this.substitude = substitude;
    }
}