import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

      name = new FormControl ('', Validators.required);
      lastname = new FormControl ('', Validators.required);
      username = new FormControl ('', Validators.required);
      email = new FormControl ('', [Validators.required, Validators.email]);
      password = new FormControl ('', Validators.required);

}

