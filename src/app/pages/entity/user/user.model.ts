
export enum UserRole {
    admin = "admin",
    editor = "editor",
    guest = "guest"
}

export enum UserGender {
    male = "male",
    female = "female",
    x = "x",
    unknown = "unknown"
}


export class User {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    gender: UserGender = UserGender.unknown;
    role: UserRole = UserRole.guest;
    
    constructor(id = 0,firstName = "", lastName = "", email = "", gender = UserGender.unknown){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }
}