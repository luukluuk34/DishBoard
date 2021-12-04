import { Entity } from "../../../core/common/entity.model";

export class Nutrition extends Entity{
    calories:Number;
    carbohydrates:Number;
    sodium:Number;
    protein:Number;
    fat:Number;
    fiber:Number;
    constructor(id = 0, calories = 0, carbohydrates = 0, sodium = 0, protein = 0, fat = 0, fiber = 0){
        super(id);
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.sodium = sodium;
        this.protein = protein;
        this.fat = fat
        this.fiber = fiber;
    }
}