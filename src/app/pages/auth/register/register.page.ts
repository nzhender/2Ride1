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

  nombre: string = '';
  email: string = '';
  password: string = '';
  tipo: 'motociclista' | 'taller' = 'motociclista';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister() {
    if (!this.nombre || !this.email || !this.password || !this.tipo) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ok = this.authService.registrar(
      this.nombre,
      this.email,
      this.password,
      this.tipo
    );

    if (!ok) {
      alert('Ya existe un usuario registrado con ese correo.');
      return;
    }

    alert('Cuenta creada correctamente. Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
