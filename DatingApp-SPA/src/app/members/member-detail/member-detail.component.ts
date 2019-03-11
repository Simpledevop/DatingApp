import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;


  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUser();  //Now this is handled by MemberDetailResolver
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  // members/4
  // loadUser() {

  //    this.userService.getUser(+this.route.snapshot.params.id).subscribe((user: User) => {
  //      this.user = user;
  //      debugger;
  //    }, error => {
  //      this.alertify.error(error);
  //    }); // + in front means id will be retrieved a string but converted to a number
  // }
}
