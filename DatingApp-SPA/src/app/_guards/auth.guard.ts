import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  // CanActivate decides if a route can be activated/accessed.
  // It returns an Observable of boolean or a Promise of a boolean
  // or just a boolean
  // In TypeScript when you see : after a method, this specify
  // the return type, when you see Pipes | between the return types
  // this is known as UNION type...means we can return any 1 of the 3
  // return types...in this case we are just going to return a boolean.
  // As long as the return type is one of those types it works fine,
  // else you get an error, saying can't return that type
  canActivate(): // Observable<boolean> | Promise<boolean> | boolean {
    boolean {  // but don't need the other return types so have commented them out.

    // We want to check if the user is logged , so will need AuthService
    // We want to redirect user if not logged , send back to Home page
    // Notify them if they misbehave with the AlertifyService
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
