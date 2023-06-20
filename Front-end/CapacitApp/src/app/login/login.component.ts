import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';//importe clase formcontrol

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder){

  }

  login(){
    console.log(this.formUser.value.emailControl)
    console.log(this.formUser.value.passwordControl)
    console.log("Ingresa a Login")
  }

  get emailControl () {
    return this.formUser.get('emailControl') as FormControl;
  }

  get passwordControl (){
    return this.formUser.get('passwordControl') as FormControl;
  }

  formUser = this.fb.group({
    'emailControl' : ['', Validators.required],
    'passwordControl' : [ '', [Validators.required, Validators.minLength(8)]]
  });

}
