import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthenticationService} from "../authentication.service"
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit{

    signInForm: FormGroup;

    constructor( private authService: AuthenticationService,
                 private router: Router) {}
    ngOnInit() {
        //onInit i declare and create the formgroup object which has the characteristics
        //of the form elements.
        this.signInForm = new FormGroup({
            email: new FormControl(null,[
                Validators.required,
                Validators.pattern("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")
            ]),//the email is not optional thoough i has to be written according to this REGEX
            password: new FormControl(null, Validators.required)
        });

    }
    onSignIn(form) {
        const user = new User(form.value.email, form.value.password);
        this.authService.signIn(user)
            .subscribe(
              data => {
                  console.log(data);
                  //here i save the token and the userId returned from the server
                  //to the local browser memory. This memory lasts for 2 hours
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('userId', data.userId);
                  this.router.navigateByUrl('/sign-in');
              },
              error => {
                  console.error(error)
              }
            );
    }

}