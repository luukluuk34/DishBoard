import { Entity } from "../../../core/common/entity.model";
import { Ingredient } from "../ingredient/ingredient.model";
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export class User extends Entity{
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    dateOfBirth:Date;
    role:Role;
    
    constructor(id = 0,firstName = "", lastName = "", email = "",about = "", date = new Date()){
        super(id);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.about = about;
        this.dateOfBirth = new Date(date.toString().split(' ')[0]);
        this.role = Role.USER;
    }
}