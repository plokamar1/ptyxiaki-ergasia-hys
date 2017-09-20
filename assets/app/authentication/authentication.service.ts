import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'

import {User} from "../models/user.model";
import {error} from "util";

declare const FB: any;
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

    FBSignIn(){

        //check login status. if connected then ask for user email. The user will be matched in the database by email
        //and user fb id
        FB.getLoginStatus(function(response) {
            if( response.status === "connected"){
                //get the email of the user from facebook
                FB.api('/me','get',{fields:"email"},function (resp) {
                    console.log(response);
                    const user = new User(resp.email,'FB','','', response.authResponse.userID);
                    return user;
                });
            }else{
                //if the user isnt connected a pop up window appears and asks for authentication
                FB.login(function(response) {
                    if(response.status === "connected"){
                        //then the same happens and we produce the user model which will be sent to the database
                        FB.api('/me','get',{fields:"email"},function (resp) {
                            console.log(response);
                            const user = new User(resp.email,'FB','','', response.authResponse.userID);
                            console.log(user);
                            return user;
                        });
                    }
                }, //these are the permissions we are asking the user to give us
                    {scope: 'public_profile,user_friends,email,pages_show_list', return_scopes: true});
            }
        });
    }

}