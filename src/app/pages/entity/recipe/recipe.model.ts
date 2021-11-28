import { Entity } from "../../../core/common/entity.model";
import { User } from "../user/user.model";


export class Recipe extends Entity{
    name: String;
    time: Number;
    forAmountOfPeople: Number;
    description: String[];
    tips:String;
    user_id: string;
    imgUrl: String;
    
    constructor(id = 0,name = "", time = 0, forAmountOfPeople = 0,description = [""], tips = "", user_id = "", imgUrl = ""){
        super(id);
        this.name = name;
        this.time = time;
        this.forAmountOfPeople = forAmountOfPeople;
        this.description = description;
        this.tips = tips;
        this.user_id = user_id;
        this.imgUrl = imgUrl;
    }
}