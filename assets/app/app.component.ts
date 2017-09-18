import { Component } from '@angular/core';
import {FacebookService} from "ngx-facebook";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor( private fb: FacebookService,){

        //fb.init should start right away. The appId and the version aren't optional
        fb.init({appId      : '697020153828938',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.8'
            }
        );
    }
    
}