import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';//importe clase formcontrol

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder){

  }


  get Username (){
    return this.formUser.get('Username') as FormControl;
  }

  get Password (){
    return this.formUser.get('Password') as FormControl;
  }

  /*formUser = new FormGroup ({
    'Username' : new FormControl('', Validators.required),//agrego validacion de q el nombre es obligatorio
    'Password' : new FormControl('', [Validators.required, Validators.minLength(8)])
  })*/

  formUser = this.fb.group({
    'Username' : ['', Validators.required],
    'Password' : [ '', [Validators.required, Validators.minLength(8)]]
  });



  /*Username = new FormControl('', Validators.required);//agrego validacion de q el nombre es obligatorio
  Password = new FormControl('', [Validators.required, Validators.minLength(8)]);//agrego validacion de q el nombre es obligatorio y que debe tener 8 o más caracteres*/

}
