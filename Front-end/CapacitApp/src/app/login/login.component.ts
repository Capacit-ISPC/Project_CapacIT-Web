import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {}

  login() {
    console.log("Ingresa a Login de componente");

    const email = this.formUser.value.emailControl || 'correo@example.com';
    const password = this.formUser.value.passwordControl || 'contraseña123';

    this.authService.login(email, password).subscribe({
      next: (data) => {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (12 * 60 * 60 * 1000));
        document.cookie = `token=${data.token}; expires=${expiryDate.toUTCString()}; path=/`;

        console.log("Token obtenido: " + data.token);
        console.log("Datos del usuario al iniciar sesión:", data);

        this.authService.setToken(data.token);
        this.authService.setUsuarioActual({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          last_name: data.user.last_name,
          password: '',
          is_active: data.user.is_active,
          is_staff: data.user.is_staff,
          token: data.token
        });

        alert("Logueo exitoso");
        this.router.navigate(['/course']);
      },
      error: (error) => {
        console.log("Error al loguearse", error);
        alert("El usuario no está registrado");
      }
    });
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
