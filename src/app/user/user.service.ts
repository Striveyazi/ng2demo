import { User } from '../../assets/entity/user';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UserService {
    constructor(private http: Http) { }
    private getuserUrl = "../../../assets/entity/user.json";
    getUser(): Observable<User[]> {
        return this.http.get(this.getuserUrl)
            .map(this.extractData).catch(this.handleError);
    }
    addUser(user:User){
        console.log('add-user');
        console.log(user);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}