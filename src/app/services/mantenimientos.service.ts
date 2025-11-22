import { Injectable } from '@angular/core';
import { Mantenimiento } from '../models/mantenimiento.model';

@Injectable({ providedIn: 'root' })
export class MantenimientosService {
  private storageKey = '2ride1_mantenimientos';
  private mantenimientos: Mantenimiento[] = [];

  constructor() { this.cargar(); }

  private cargar(): void {
    try {
      const raw = localStorage.getItem(this.storageKey);
      this.mantenimientos = raw ? JSON.parse(raw) : [];
    } catch {
      this.mantenimientos = [];
    }
  }

  private guardar(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.mantenimientos));
  }

  getPorMoto(motoId: string): Mantenimiento[] {
    return this.mantenimientos
      .filter(m => m.motoId === motoId)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  // NUEVO: obtener no sellados (para vista Taller)
  getNoSellados(): Mantenimiento[] {
    return this.mantenimientos.filter(m => !m.sellado);
  }

  agregar(data: Omit<Mantenimiento, 'id' | 'sellado' | 'selladoPor'>): Mantenimiento {
    const nuevo: Mantenimiento = {
      ...data,
      id: this.generarId(),
      sellado: false,       // NUEVO
      selladoPor: undefined // NUEVO
    };
    this.mantenimientos.push(nuevo);
    this.guardar();
    return nuevo;
  }

  eliminar(id: string): void {
    this.mantenimientos = this.mantenimientos.filter(m => m.id !== id);
    this.guardar();
  }

  // NUEVO: acción de “sellar” (validar) por Taller
  sellar(id: string, nombreTaller: string): void {
    const i = this.mantenimientos.findIndex(m => m.id === id);
    if (i === -1) return;
    this.mantenimientos[i].sellado = true;
    this.mantenimientos[i].selladoPor = nombreTaller;
    this.guardar();
  }

  private generarId(): string {
    if ((crypto as any)?.randomUUID) return (crypto as any).randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}
