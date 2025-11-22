import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Moto } from 'src/app/models/moto.model';
import { Mantenimiento } from 'src/app/models/mantenimiento.model';
import { MotosService } from 'src/app/services/motos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.page.html',
  styleUrls: ['./mantenimientos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class MantenimientosPage implements OnInit {

  moto: Moto | undefined;
  lista: Mantenimiento[] = [];
  motoId = '';

  // modelo del formulario
  form: {
    tipo: string;
    fecha: string;
    km: number | null;
    costo: number | null;
    notas: string;
  } = {
    tipo: '',
    fecha: '',
    km: null,
    costo: null,
    notas: ''
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
    private route: ActivatedRoute,
    private router: Router,
    private motosService: MotosService,
    private mantService: MantenimientosService
  ) {}

  ngOnInit() {
    this.motoId = this.route.snapshot.paramMap.get('motoId') || '';
    if (!this.motoId) {
      alert('No se recibió la motocicleta.');
      this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
      return;
    }
    this.moto = this.motosService.getMotoById(this.motoId);
    if (!this.moto) {
      alert('Motocicleta no encontrada.');
      this.router.navigateByUrl('/tabs/tab2', { replaceUrl: true });
      return;
    }
    this.cargarMantenimientos();
  }

  cargarMantenimientos() {
    this.lista = this.mantService.getPorMoto(this.motoId);
  }

  onAgregar() {
    if (!this.form.tipo || !this.form.fecha || this.form.km == null) {
      alert('Completa al menos tipo de servicio, fecha y kilometraje.');
      return;
    }

    this.mantService.agregar({
      motoId: this.motoId,
      tipo: this.form.tipo,
      fecha: this.form.fecha,
      km: Number(this.form.km),
      costo: this.form.costo != null ? Number(this.form.costo) : undefined,
      notas: this.form.notas.trim() || undefined
    });

    // limpiar formulario
    this.form = {
      tipo: '',
      fecha: '',
      km: null,
      costo: null,
      notas: ''
    };

    this.cargarMantenimientos();
  }

  onEliminar(item: Mantenimiento) {
    const ok = confirm(`¿Eliminar el mantenimiento "${item.tipo}"?`);
    if (!ok) return;
    this.mantService.eliminar(item.id);
    this.cargarMantenimientos();
  }

  volver() {
    this.router.navigateByUrl('/tabs/tab2');
  }
}
