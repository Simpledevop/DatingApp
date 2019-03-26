import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { longStackSupport } from 'q';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

// The job of a Component is to provide HTML to our template
// A Service is a means of prevent duplication, if other components want to call an API to get data then add the method to a service. 
// Then can centralise API calls and inject them into components that require calling them.
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  // Inject AuthService into this component
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
      console.log(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token; // Short hand for if (token != null) {return true}, else {return false};
    // let authService hadnled if loggedIn and we use jwtToken helper librbary to see if it's not expired
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    console.log('logged out');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
