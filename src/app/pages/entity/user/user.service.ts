import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EntityService } from "../../../core/common/entity.service";
import { User } from "./user.model";

@Injectable()
export class UserService extends EntityService<User>{
    constructor(http:HttpClient){
        super(http, environment.API_BASE_URL, "/user");
    }
}