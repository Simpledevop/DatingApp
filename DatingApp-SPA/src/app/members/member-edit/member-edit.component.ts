import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // In order to access the Form use the @ViewChild Decorator
  // @ViewChild pass it a dom element to assign it variable to use in here and specify it's type.

  // Simple example with normal element:

  // import {ElementRef,Renderer2} from '@angular/core';
  // @ViewChild('someVar') el:ElementRef;

  // constructor(private rd: Renderer2) {}

  // ngAfterViewInit() {
  //       console.log(this.rd);
  //       this.el.nativeElement.focus();
  // }
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  // Hostlistener listen to the browser and take action based on something that happens in the browser
  // In this case before the page is unloaded (clicked on x in tab or browser refreshes), then check if form is dirty
  // and show call unload notification which prompts changes maybe lost.
  // @ symbol means Decorator and HostListner is a DECORATOR of a method...and will invoke the method under it and pass it event data.
  // Decorator allows us to define this intent without having to actually put any code inside the class.e.g @Component and @NgModule

  @HostListener('window:beforeunload', ['$event'])
  // So we are listening to the windows event beforeunload
  unloadNotificationfff($event2: any) {
    debugger;
    if (this.editForm.dirty) {
      $event2.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    debugger;
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
    this.alertify.success('Profile updated successfully');

    // This will make the form not dirty anymore. And reset it back with the user model.
    this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

  // So when the photo is changed in the child component it is emited up to this component and this method is called
  // to change the user photo on screen.
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
