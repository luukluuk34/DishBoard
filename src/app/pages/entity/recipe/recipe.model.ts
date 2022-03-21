import { Entity } from "../../../core/common/entity.model";
import { Ingredient } from "../ingredient/ingredient.model";
import { User } from "../user/user.model";


export class Recipe extends Entity{
    name: String;
    time: Number;
    forAmountOfPeople: Number;
    description: String[];
    tips:String;
    user: User;
    imgUrl: String;
    ingredients:Ingredient[];
    
    constructor(id = 0,name = "", time = 0, forAmountOfPeople = 0,description = [""], tips = "", user = new User(), imgUrl = "", ingredients = []){
        super(id);
        this.name = name;
        this.time = time;
        this.forAmountOfPeople = forAmountOfPeople;
        this.description = description;
        this.tips = tips;
        this.user = user;
        this.imgUrl = imgUrl;
        this.ingredients = ingredients;
    }
}