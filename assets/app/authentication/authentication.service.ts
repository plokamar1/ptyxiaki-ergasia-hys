import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {FacebookService, LoginResponse} from "ngx-facebook";

import 'rxjs/Rx'

import {User} from "../models/user.model";
import {error} from "util";

@Injectable()
export class AuthenticationService {

    constructor( private http: Http,
                 private fb: FacebookService,) {}

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

    FBSignIn(){
        const options  = {
            scope: 'public_profile,user_friends,email,pages_show_list',
            return_scopes: true,
            enable_profile_selector: true
        };

        this.fb.getLoginStatus()
            .then((res) => {
            console.log(res);
            });

        this.fb.login(options)
            .then(
                (res: LoginResponse ) => {return res;}
            )
            .catch(
                (error: LoginResponse) =>{console.log(error);}
            )


    }
}