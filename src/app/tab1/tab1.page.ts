import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { MotosService } from '../services/motos.service';
import { RecordatoriosService } from '../services/recordatorios.service';
import { MantenimientosService } from '../services/mantenimientos.service';

import { Usuario } from '../models/usuario.model';
import { Moto } from '../models/moto.model';
import { Mantenimiento } from '../models/mantenimiento.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab1Page implements OnInit {

  usuario: Usuario | null = null;

  // Resumen para motociclista
  motos: Moto[] = [];
  totalMantenimientos = 0;
  totalRecordatorios = 0;

  // Bandeja para taller
  pendientes: Mantenimiento[] = [];

  constructor(
    private auth: AuthService,
    private motosService: MotosService,
    private recService: RecordatoriosService,
    private mantService: MantenimientosService
  ) {}

  ngOnInit() {
    this.usuario = this.auth.getUsuarioActual();
    this.cargar();
  }

  ionViewWillEnter() {
    this.usuario = this.auth.getUsuarioActual();
    this.cargar();
  }

  get esTaller(): boolean {
    return this.usuario?.tipo === 'taller';
  }

  cargar() {
    if (this.esTaller) {
      this.pendientes = this.mantService.getNoSellados();
    } else {
      this.motos = this.motosService.getMotos();
      // pequeñísimo resumen
      this.totalRecordatorios = this.recService.getTodos().length;
      // contar mantenimientos (de todas las motos)
      this.totalMantenimientos = this.motos
        .map(m => this.mantService.getPorMoto(m.id).length)
        .reduce((a, b) => a + b, 0);
    }
  }

  sellar(m: Mantenimiento) {
    if (!this.usuario) return;
    this.mantService.sellar(m.id, this.usuario.nombre);
    this.cargar();
  }
}
