import { Entity } from "./entity.model";
import { HttpClient, HttpParams,HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError, Observable,throwError, map, tap } from "rxjs";
import { NgIf } from "@angular/common";

export class EntityService<T extends Entity> {

    constructor(
        protected readonly http: HttpClient,
        public readonly url: string,
        public readonly endpoint: string){}


        public getList(params?: HttpParams) : Observable<T[]> {
            const endpoint = `${this.url}${this.endpoint}`;
            console.log(`list ${endpoint} params = ${params}`);
            return this.http.get<T[]>(endpoint)
                             .pipe(tap(console.log), catchError(this.handleError));
        }

        public getById(_id: string | number | null | undefined,params?: HttpParams) : Observable<T>{
            const endpoint = `${this.url}${this.endpoint}/${_id}`;
            console.log(`_id ${endpoint} params = ${params}`);
            return this.http.get<T>(endpoint)
                            .pipe(tap(console.log), catchError(this.handleError));
        }

        public delete(_id:string| number | null | undefined, header?:HttpHeaders, params?:HttpParams) : Observable<T>{
            const endpoint = `${this.url}${this.endpoint}/${_id}`;
            console.log(`delete ${endpoint} header=${header} params = ${params}`);
            return this.http.delete<T>(endpoint, {headers:header}).pipe(tap(console.log),catchError(this.handleError));
        }

        public create(param:T,header?:HttpHeaders, params?:HttpParams): Observable<T> {
            const endpoint = `${this.url}${this.endpoint}`;
            console.log(`create ${this.endpoint} params = ${params}, object =`,param);
            return this.http.post<T>(endpoint, param, {headers:header}).pipe(tap(console.log),catchError(this.handleError));
        }
        
        public update(param:T, _id:string | number | null | undefined, header?:HttpHeaders, params?:HttpParams): Observable<T> {
            const endpoint = `${this.url}${this.endpoint}/${_id}`;
            console.log(`update ${this.endpoint} params = ${params}, object =`,param);
            return this.http.put<T>(endpoint, param, {headers:header}).pipe(tap(console.log),catchError(this.handleError));
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
    

}