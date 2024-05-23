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
    const usuarioActual = this.authService.getUsuarioActual(); // Obtener la información del usuario actual
    if (usuarioActual) {
      const usuarioId = usuarioActual.id; // Obtener el ID del usuario actual
      this.getPerfil(usuarioId);
    } else {
      console.error('Error: No se pudo obtener el usuario actual.');
    }
  }

  getPerfil(usuarioId: number) {
    this.perfilService.getPerfil(usuarioId).subscribe({
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
