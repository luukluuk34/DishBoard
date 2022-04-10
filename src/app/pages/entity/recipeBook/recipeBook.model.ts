import { Entity } from "../../../core/common/entity.model";
import { Recipe } from "../recipe/recipe.model";
import { User } from "../user/user.model";

export class RecipeBook extends Entity{
    title:string;
    about:string;
    chapters:Chapter[];
    user:User;

    constructor(id = 0, title = "", about = "", chapters:Chapter[] = [],user:User = new User()){
        super(id);
        this.title = title;
        this.about = about;
        this.chapters = chapters;
        this.user = user;
    }
}

export class Chapter extends Entity {
    chapterTitle:String;
    chapterIntro:String;
    recipeList:Recipe[];
    
    constructor(id = 0, chapterTitle = "", chapterIntro = "", recipeList:Recipe[] = []){
        super(id);
        this.chapterTitle = chapterTitle;
        this.chapterIntro = chapterIntro;
        this.recipeList = recipeList;
    }
}