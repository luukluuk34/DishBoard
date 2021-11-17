export enum UserRole {
    admin = "admin",
    editor = "editor",
    guest = "guest"
}

export class User {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    role: UserRole = UserRole.guest;
    
    constructor(id = 0,firstName = "", lastName = "", email = ""){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}