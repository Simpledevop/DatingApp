import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

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

  //Inject AuthService into this component
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log("Logged in successfully");
    }, error => {
      console.log("Failed to login");
    });
  }
}
