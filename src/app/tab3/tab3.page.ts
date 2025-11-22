import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Moto } from '../models/moto.model';
import { Recordatorio } from '../models/recordatorio.model';
import { MotosService } from '../services/motos.service';
import { RecordatoriosService } from '../services/recordatorios.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab3Page implements OnInit {

  motos: Moto[] = [];
  recordatorios: Recordatorio[] = [];

  form = {
    motoId: '',
    tipoServicio: '',
    tipoRecordatorio: 'fecha' as 'fecha' | 'km',
    fechaObjetivo: '',
    kmObjetivo: null as number | null
  };

  tiposServicios = [
    'Cambio de aceite',
    'Lubricación de cadena',
    'Revisión de frenos',
    'Cambio de neumáticos',
    'Batería',
    'Otro'
  ];

  constructor(
    private motosService: MotosService,
    private recService: RecordatoriosService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar() {
    this.motos = this.motosService.getMotos();
    this.recordatorios = this.recService.getTodos();
  }

  onAgregar() {
    if (!this.form.motoId || !this.form.tipoServicio) {
      alert('Selecciona una moto y un tipo de servicio.');
      return;
    }

    if (this.form.tipoRecordatorio === 'fecha' && !this.form.fechaObjetivo) {
      alert('Selecciona una fecha objetivo.');
      return;
    }

    if (this.form.tipoRecordatorio === 'km' && this.form.kmObjetivo == null) {
      alert('Ingresa el kilometraje objetivo.');
      return;
    }

    this.recService.agregar({
      motoId: this.form.motoId,
      tipoServicio: this.form.tipoServicio,
      tipoRecordatorio: this.form.tipoRecordatorio,
      fechaObjetivo: this.form.tipoRecordatorio === 'fecha' ? this.form.fechaObjetivo : undefined,
      kmObjetivo: this.form.tipoRecordatorio === 'km' ? Number(this.form.kmObjetivo) : undefined,
    });

    // limpiar formulario
    this.form = {
      motoId: '',
      tipoServicio: '',
      tipoRecordatorio: 'fecha',
      fechaObjetivo: '',
      kmObjetivo: null
    };

    this.cargar();
  }

  nombreMoto(id: string): string {
    const m = this.motos.find(x => x.id === id);
    if (!m) return 'Moto desconocida';
    return `${m.marca} ${m.modelo}`;
  }

  onToggleActivo(rec: Recordatorio, event: any) {
    this.recService.cambiarEstado(rec.id, event.detail.checked);
    this.cargar();
  }

  onEliminar(rec: Recordatorio) {
    const ok = confirm('¿Eliminar este recordatorio?');
    if (!ok) return;
    this.recService.eliminar(rec.id);
    this.cargar();
  }
}
