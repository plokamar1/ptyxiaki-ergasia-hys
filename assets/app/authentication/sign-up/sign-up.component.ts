import {Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { User} from "../../models/user.model"

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    user: User;
    constructor( private fb: FacebookService) {
    //First we have to call fb.init() in order to make further calls to the facebook api
        // the appId is necessary for facebook to accept the init.
        console.log('Initializing Facebook');
        fb.init({
            appId: 'We need an appId',
            version: 'v2.10'
        });

    }

    ngOnInit() {
        this.signUpForm = new FormGroup({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
            ]),
            password: new FormControl(null, Validators.required)

        });
    }
    //onSubmit gives us the user info when he submits.
    onSubmit(form: NgForm) {
        this.user = new User(form.form.value.firstname,
                            form.form.value.lastname,
                            form.form.value.email,
                            form.form.value.password,
                            "form"
            );
        console.log(form);
        console.log(this.user);
        //this.signUpForm.reset();
    }

    //onFBLogin attempts to log the user in facebook via the app. It should return some basic information for the user
    onFBLogin() {
  /*      this.fb.login()
            .then((res: LoginResponse) => {
                console.log('Logged in', res);
            })
            .catch(this.handleError);*/
    }

    //catches the errors
    private handleError(error) {
        console.error('Error processing action', error);
    }
}