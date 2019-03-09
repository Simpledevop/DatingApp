import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  private userToDisplay: User;

  @Input() set user(value: User) {
    this.userToDisplay = value;
  }

  get user(): User {
    return this.userToDisplay;
  }

  constructor() { }

  ngOnInit() {
  }

}
