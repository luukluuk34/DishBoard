import { Entity } from "./entity.model";

export enum UserRole {
    admin = "admin",
    editor = "editor",
    guest = "guest"
}

export class User extends Entity{
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    dateOfBirth:Date;
    
    constructor(id = 0,firstName = "", lastName = "", email = "",about = "", date = new Date()){
        super(id);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.about = about;
        this.dateOfBirth = date;
    }
}