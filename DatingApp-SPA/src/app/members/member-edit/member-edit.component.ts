import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

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
  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    debugger;
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated successfully');

    // This will make the form not dirty anymore. And reset it back with the user model.
    this.editForm.reset(this.user);
  }
}
