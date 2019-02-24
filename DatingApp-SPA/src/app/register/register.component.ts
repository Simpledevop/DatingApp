import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

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
  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {
      console.log(error);
    });
    console.log(this.model);
  }

  cancel() {
    // Emit because emitting something from this method
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
