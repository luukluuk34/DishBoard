import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { EntityService } from "src/app/core/common/entity.service";
import { environment } from "src/environments/environment";
import { User } from "../user/user.model";
import { RecipeBook } from "./recipeBook.model";

@Injectable()
export class RecipeBookService extends EntityService<RecipeBook>{
    constructor(http:HttpClient){
        super(http, environment.API_BASE_URL, "/recipeBook");
    }
    
    public getByUserId(user:string|null, params?: HttpParams): Observable<RecipeBook[]> {
        const endpoint = `${this.url}${this.endpoint}/user/${user}`;
        console.log(`list ${endpoint} params = ${params}`);
        return this.http.get<RecipeBook[]>(endpoint)
                         .pipe(tap(console.log));
    }

    public followRecipeBook(user:User,recipeBook:string|undefined, header?:HttpHeaders, params?: HttpParams){
        const endpoint = `${this.url}${this.endpoint}/follow/${recipeBook}`;
        console.log(`list ${endpoint} params = ${params}`);
        return this.http.post<RecipeBook>(endpoint,user,{headers:header}).pipe(tap(console.log))
    }

    public unFollowRecipeBook(user:User,recipeBook:string|undefined, header?:HttpHeaders, params?: HttpParams){
        const endpoint = `${this.url}${this.endpoint}/unfollow/${recipeBook}`;
        console.log(`list ${endpoint} params = ${params}`);
        return this.http.post<RecipeBook>(endpoint,user,{headers:header}).pipe(tap(console.log))
    }

    public getFollowing(userId:string|number|undefined, header?:HttpHeaders, params?: HttpParams){
        const endpoint = `${this.url}${this.endpoint}/follow/${userId}`;
        console.log(`list ${endpoint} params = ${params}`);
        return this.http.get<RecipeBook>(endpoint,{headers:header}).pipe(tap(console.log))
    }
}