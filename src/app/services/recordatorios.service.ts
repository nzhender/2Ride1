import { Injectable } from '@angular/core';
import { Recordatorio } from '../models/recordatorio.model';

@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  private storageKey = '2ride1_recordatorios';
  private recordatorios: Recordatorio[] = [];

  constructor() {
    this.cargar();
  }

  private cargar(): void {
    try {
      const raw = localStorage.getItem(this.storageKey);
      this.recordatorios = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error cargando recordatorios', e);
      this.recordatorios = [];
    }
  }

  private guardar(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.recordatorios));
  }

  getTodos(): Recordatorio[] {
    return [...this.recordatorios];
  }

  getPorMoto(motoId: string): Recordatorio[] {
    return this.recordatorios.filter(r => r.motoId === motoId);
  }

  agregar(data: Omit<Recordatorio, 'id' | 'activo'>): Recordatorio {
    const nuevo: Recordatorio = {
      ...data,
      id: this.generarId(),
      activo: true
    };
    this.recordatorios.push(nuevo);
    this.guardar();
    return nuevo;
  }

  cambiarEstado(id: string, activo: boolean) {
    const i = this.recordatorios.findIndex(r => r.id === id);
    if (i === -1) return;
    this.recordatorios[i].activo = activo;
    this.guardar();
  }

  eliminar(id: string) {
    this.recordatorios = this.recordatorios.filter(r => r.id !== id);
    this.guardar();
  }

  private generarId(): string {
    if ((crypto as any)?.randomUUID) {
      return (crypto as any).randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}
