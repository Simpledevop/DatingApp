import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';
// folder named _services just for preference so it sits just under the app folder and distinguishable away from the component folders.
// Injectable tells Angular engine that it allows it to be injected into the Component.
@Injectable({
  providedIn: 'root' // This tells any components that use this service which module is PROVIDING (under 'providers') this service, 
                     // in this case, it's the 'root' module...which would be the app.module.
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // A Subject is a special type of Observable that allows values to be
  // multicasted to many Observables. Subjects are like EventEmitters.
  // Observables Observables open up a continuous channel of communication in which multiple values of data can
  // be emitted over time. From this we get a pattern of dealing with data by using array-like operations to parse,
  // modify and maintain data.
  // Observables in Angular
  // Angular makes use of observables as an interface to handle a variety of common asynchronous operations. For example:

  // The EventEmitter class extends Observable.
  // The HTTP module uses observables to handle AJAX requests and responses.
  // The Router and Forms modules use observables to listen for and respond to user-input events.
  // BehvaiorSubject allows Any to Any Communication, i.e, a child component notifies another direct relatation
  // F12 are you can see it extends Subject and Subjects extends Observable.
  // We can send values to the subject.
  // So subscribers can receive updated results

  // child component...sitting under a different parent.
  // so we subscribe to photoUrl and when this updated our components subscribing to it will update.
  // we use BehaviorSubject when we want to emit out to all components something changed...
  // unlike an eventemitter, that only works with output to parent...this can allow it to emit to child under a different parent.
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string){
    // the behaviourSubject has a next method, we pass it a value and this will update the photoUrl
    // so instead of the photourl being the user.png photo
    this.photoUrl.next(photoUrl);
    debugger;
  }

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
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          console.log(this.decodedToken);
          this.changeMemberPhoto(this.currentUser.photoUrl);
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
