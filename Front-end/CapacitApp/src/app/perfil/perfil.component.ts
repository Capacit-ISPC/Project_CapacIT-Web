import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { Perfil } from '../Models/Perfil';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: Perfil | undefined;

  constructor(private perfilService: PerfilService, private authService: AuthService) { }

  ngOnInit(): void {
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.getPerfilDesdeServidor(usuarioId);
    } else {
      console.error('Error: No se pudo obtener el usuario actual.');
    }
  }

  getPerfilDesdeServidor(usuarioId: number) {
    this.authService.getUsuarioActualDesdeServidor(usuarioId).subscribe({
      next: (perfil) => {
        this.perfil = perfil;
        console.log('Perfil del usuario:', this.perfil);
      },
      error: (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    });
  }
}