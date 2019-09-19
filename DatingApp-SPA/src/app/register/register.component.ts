import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Input() valuesFromHome: any; // @Input now you have access to this RegisterComponent
                                // through the directive <Register [valuesFromHome] = aVariable from parent
  @Output() cancelRegister = new EventEmitter(); // Output requires EventEmitter
  model: any = {};
  registerForm: FormGroup; // Tracks the value and validity state of a group of FormControl instances

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
    username: new FormControl(), // FormGroup contains FormControls which are basically our fields
    password: new FormControl(),
    confirmPassword: new FormControl(),
    });
}

  register() {
    // this.authService.register(this.model).subscribe(() => {
     // console.log('registration successful');
    //  this.alertify.success('registration successful');
    // } , error => {
    //  console.log(error);
    //  this.alertify.error(error);
   // });
   // console.log(this.model);
   console.log(this.registerForm.value);
  }

  cancel() {
    // Emit because emitting something from this method
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
