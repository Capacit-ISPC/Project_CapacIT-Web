import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  newUser: User = {} as User;

  constructor(private userService: UserService){

  }

  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  crearUsuario(){
    
    console.log("entra a registrar")

    this.userService.registrarUsuario(this.newUser).subscribe({
      next: (data) => {
        console.log("Usuario creado exitosamente",data)
        this.newUser = data;
      },
      error: (error) => {
        console.log("error al crear el usuario", error)
      }
    })
  }
}

