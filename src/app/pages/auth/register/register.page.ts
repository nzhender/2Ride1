import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegisterPage {

  nombre = '';
  correo = '';
  password = '';
  tipo: 'motociclista' | 'taller' = 'motociclista';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    if (!this.nombre || !this.correo || !this.password) {
      alert('Completa todos los campos.');
      return;
    }

    const usuario = this.authService.registrar(
      this.nombre,
      this.correo,
      this.password,
      this.tipo
    );

    if (!usuario) {
      alert('Ya existe un usuario registrado con ese correo.');
      return;
    }

    alert('Registro exitoso. Sesión iniciada.');
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

  irALogin() {
    this.router.navigateByUrl('/login');
  }
}
