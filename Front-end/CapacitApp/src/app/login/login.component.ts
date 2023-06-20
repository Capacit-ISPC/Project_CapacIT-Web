import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';//importe clase formcontrol
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

  }

  login() {
    //console.log(this.formUser.value.emailControl)
    //console.log(this.formUser.value.passwordControl)
    console.log("Ingresa a Login")

    const email = this.formUser.value.emailControl || 'correo@example.com';
    const password = this.formUser.value.passwordControl || 'contraseña123';

    this.userService.login(email, password).subscribe({
      next: (data) => {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (12 * 60 * 60 * 1000));
        document.cookie = `token=${data.token}; expires=${expiryDate.toUTCString()}; path=/`;

        console.log(data.token)
        alert("Logueo exitoso")
        this.router.navigate(['/courses']);
      }, error: (error) => {
        console.log("Error al loguearse",error)
        alert("El usuario no esta registrado")

      }
    })
  }

  get emailControl() {
    return this.formUser.get('emailControl') as FormControl;
  }

  get passwordControl() {
    return this.formUser.get('passwordControl') as FormControl;
  }

  formUser = this.fb.group({
    'emailControl': ['', Validators.required],
    'passwordControl': ['', [Validators.required, Validators.minLength(8)]]
  });

}
