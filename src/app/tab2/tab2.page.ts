import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { Moto } from '../models/moto.model';
import { MotosService } from '../services/motos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab2Page implements OnInit {

  motos: Moto[] = [];

  // Modelo del formulario
  formMoto: {
    marca: string;
    modelo: string;
    anio: number | null;
    kmInicial: number | null;
  } = {
    marca: '',
    modelo: '',
    anio: null,
    kmInicial: null
  };

  constructor(
    private motosService: MotosService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarMotos();
  }

  ionViewWillEnter() {
    this.cargarMotos();
  }

  cargarMotos() {
    this.motos = this.motosService.getMotos();
  }

  onAgregarMoto() {
    if (!this.formMoto.marca || !this.formMoto.modelo || !this.formMoto.anio || this.formMoto.kmInicial == null) {
      alert('Completa todos los campos de la motocicleta.');
      return;
    }

    this.motosService.agregarMoto({
      marca: this.formMoto.marca.trim(),
      modelo: this.formMoto.modelo.trim(),
      anio: Number(this.formMoto.anio),
      kmInicial: Number(this.formMoto.kmInicial),
    });

    // limpiar formulario
    this.formMoto = {
      marca: '',
      modelo: '',
      anio: null,
      kmInicial: null
    };

    this.cargarMotos();
  }

  onEliminarMoto(moto: Moto) {
    const ok = confirm(`¿Eliminar la moto "${moto.marca} ${moto.modelo}"?`);
    if (!ok) return;

    this.motosService.eliminarMoto(moto.id);
    this.cargarMotos();
  }

  onVerMantenimientos(moto: Moto) {
    this.router.navigate(['/mantenimientos', moto.id]);
  }

  logout() {
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

