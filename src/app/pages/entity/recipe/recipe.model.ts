import { Entity } from "../../../core/common/entity.model";
import { User } from "../user/user.model";


export class Recipe extends Entity{
    name: String;
    time: Number;
    forAmountOfPeople: Number;
    description: String;
    tips:String;
    madeBy: User;
    
    constructor(id = 0,name = "", time = 0, forAmountOfPeople = 0,description = "", tips = "", madeBy = new User()){
        super(id);
        this.name = name;
        this.time = time;
        this.forAmountOfPeople = forAmountOfPeople;
        this.description = description;
        this.tips = tips;
        this.madeBy = madeBy;
    }
}