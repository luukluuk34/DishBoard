import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { EntityService } from "../../../core/common/entity.service";
import { User } from "./user.model";

@Injectable()
export class UserService extends EntityService<User>{
    constructor(http:HttpClient){
        super(http, environment.API_BASE_URL, "/user");
    }

    public getFollowing(_id: string | number | null | undefined): Observable<User[]>{
        const endpoint = `${environment.API_BASE_URL}/user/follow/${_id}`;
        console.log(`list ${endpoint}`);
        return this.http.get<User>(endpoint).pipe(tap(console.log));
    }
    public follow(_id: string | number | null | undefined, loggedUserId: string | number | null | undefined): Observable<User[]>{
        const endpoint = `${environment.API_BASE_URL}/user/follow/${_id}`;
        console.log(`list ${endpoint}`);
        console.log(_id,loggedUserId)
        return this.http.post<User>(endpoint,{userId:loggedUserId}).pipe(tap(console.log));
    }

}