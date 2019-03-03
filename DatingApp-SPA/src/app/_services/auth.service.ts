import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
// folder named _services just for preference so it sits just under the app folder and distinguishable away from the component folders.
// Injectable tells Angular engine that it allows it to be injected into the Component.
@Injectable({
  providedIn: 'root' // This tells any components that use this service which module is PROVIDING (under 'providers') this service, 
                     // in this case, it's the 'root' module...which would be the app.module.
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }

  login(model: any) { // replicating what we did in postman but in this service
  return this.http.post(this.baseUrl + 'login', model) // Observable - Contstructs Post request
                    // and gets the body of the json response and interprets it as an Object
    // tslint:disable-next-line:max-line-length
    .pipe( // pipe chains functions e.g, pipe(func1, func2)...so one action occurs after the other...and can do a bunch of stuff on the response  
      map((response: any) => {  // map - items emitted by Observable, as they come in ,
                                // lets us lambda parse into the function..in this case will be just one response
                                // often map is used on array so can parse the elements as you desire
                                // in this case we just do one thing, so instead of get response...then
                                // add to localStorage...it's all done inline, so future self is not confused by this. ;)
        const user = response;
        if (user) {
          // tslint:disable-next-line:no-debugger
          debugger;
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // A Hacker could pretend to have an JWT Token called 'token' in their local storage
    // and see the menu items, but any Dating App API calls will pass that token
    // and be decoded and checked if password match up with Hash Password
    // and the hacker will be prevented from doing anything else...
    // like even getting data for a page. So this is ok.
    return !this.jwtHelper.isTokenExpired(token);
  }
}
