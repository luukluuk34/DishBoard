import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { EntityService } from "../../../core/common/entity.service";
import { User } from "./user.model";

@Injectable()
export class AuthenticationService {
    public currentUser: User | undefined;
    public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
    private readonly CURRENT_USER = 'currentuser';
    private readonly CURRENT_TOKEN = 'currenttoken';
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })
    constructor(protected readonly http: HttpClient, private router: Router){
        this.getUserFromLocalStorage()
        .pipe(
          map((user: User) => {
            if (user) {
              console.log('User found in local storage');
              this.currentUser = user;
              this.currentUser$.next(user);
              return of(user);
            } else {
              console.log(`No current user found`);
              this.currentUser$.next(undefined);
              return of(undefined);
            }
          })
        )
        .subscribe(() => console.log('Startup auth done'));
    }
    
    
        public registerUser(param:any) : Observable<User> {
            const endpoint =`${environment.API_BASE_URL}/user/register`;
            console.log(`Register user at ${endpoint}`);
            return this.http.post<any>(endpoint, param)
                            .pipe(map((val)=>{
                              this.saveUserToLocalStorage(val.user);
                              this.saveTokenFromLocalStorage(val.token);
                              this.currentUser = val.user;
                              return val;
                            }),catchError(this.handleError));
        }

        public login(email:String,password:String) : Observable<User>{
            const endpoint = `${environment.API_BASE_URL}/user/login`;
            console.log(`Login user at ${endpoint}`);
            return this.http.post<any>(endpoint, {email, password},{headers:this.headers})
                            .pipe(map((val) => {
                                console.log(val.user)
                                this.saveUserToLocalStorage(val.user);
                                this.saveTokenFromLocalStorage(val.token);
                                console
                                this.currentUser = val.user;
                                this.currentUser$.next(val.user);
                                return val;
            }),catchError(this.handleError));
        }

        public logout(): void {
            this.router
              .navigate(['/'])
              .then((success) => {
                if (success) {
                  console.log('logout - removing local user info');
                  localStorage.removeItem(this.CURRENT_USER);
                  localStorage.removeItem(this.CURRENT_TOKEN);
                  this.currentUser = undefined;
                  this.currentUser$.next(undefined);
                } else {
                  console.log('navigate result:', success);
                }
              })
              .catch((error) => console.log('not logged out!'));
          }

        public handleError(error: HttpErrorResponse) {
            let errorMsg;
            if (error.error instanceof ErrorEvent) {
                errorMsg = `An error occurred: ${error.error.message}`;
            } else {
                errorMsg = `Backend returned code ${error.status} - ${
                    error.statusText
                }. (Could not contact server)`;
            }
            console.log("EntityService.handleError", errorMsg);
    
            // return an error observable with a user-facing error message
            return throwError({ title: "Error", message: errorMsg });
        }
        
        isLoggedIn(): Boolean {
          let token = ""
          this.getTokenFromLocalStorage().subscribe(val => {
            if(val != "null"){
              token = val;
            }else{
              token = "";
            }
          });
          if(token){
            return true
          } else {
            return false;
          }
        }

        getTokenFromLocalStorage(): Observable<string> {
          const tempStorage = String(localStorage.getItem(this.CURRENT_TOKEN))
          //onst localUser = tempStorage;
          return of(tempStorage);
        }

        getUserFromLocalStorage(): Observable<User> {
            const tempStorage = String(localStorage.getItem(this.CURRENT_USER))
            const localUser = JSON.parse(tempStorage);
            return of(localUser);
          }
        
        private saveTokenFromLocalStorage(token:string): void{
          localStorage.setItem(this.CURRENT_TOKEN, token);
        }  
        private saveUserToLocalStorage(user: User): void {
          localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
        }
}