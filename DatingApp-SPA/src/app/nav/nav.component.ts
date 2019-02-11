import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {}
  }, error => {
    console.log(error);
  });

}
