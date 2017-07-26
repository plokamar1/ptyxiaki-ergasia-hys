import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/Rx'

import {User} from "../models/user.model";

@Injectable()
export class AuthenticationService {

    constructor( private http: Http) {}

    signUp(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://csethesis.herokuapp.com/auth/signup', body ,{headers: headers})
            .map((response: Response)=> response.json())
            .catch((error: Response)=> Observable.throw(error.json()));
    }
    signIn(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://csethesis.herokuapp.com/auth/signin', body ,{headers: headers})
            .map((response: Response)=> response.json())
            .catch((error: Response)=> Observable.throw(error.json()));
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null ;
    }
}