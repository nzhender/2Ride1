import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor ingresa tu correo y contraseña.');
      return;
    }

    const usuario = this.authService.login(this.email, this.password);

    if (!usuario) {
      alert('Correo o contraseña incorrectos.');
      return;
    }

    // Redirigir a las tabs (panel principal)
    this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
  }

  irARegistro() {
    this.router.navigateByUrl('/register');
  }
}
