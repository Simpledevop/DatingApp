import { Component, OnInit } from '@angular/core';
// This is going to represent the list of users that have liked the currently logged on user.
// Or list of users that the user like.
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
