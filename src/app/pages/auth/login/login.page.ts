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

  email: string = '';
  password: string = '';

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

    // Si el login es correcto, redirigir al panel principal
    this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
