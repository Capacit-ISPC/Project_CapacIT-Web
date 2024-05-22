import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser: User = {} as User;

  constructor(private userService: UserService, private router: Router){

  }

  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  crearUsuario(){
    
    console.log("entra a registrar")

    this.userService.registrarUsuario(this.newUser).subscribe({
      next: (data) => {
        console.log("Usuario creado exitosamente",data)
        this.newUser = data;
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log("error al crear el usuario", error)
      }
    })
  }
}

