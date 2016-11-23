
import { User } from '../../../assets/entities/user';
import { Observable } from 'rxjs/Rx';
import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class UserService{
    constructor(private http:Http){}
    getUser():Observable<User[]>{
        return this.http.get(".../../../assets/entities/user.json")
        .map((res:Response)=>res.json())
        .catch(this.handleError);
    }
    private handleError(error:any){
        let errMsg = (error.message)?error.message:
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
    }
}