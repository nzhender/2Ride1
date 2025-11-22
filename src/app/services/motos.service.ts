import { Injectable } from '@angular/core';
import { Moto } from '../models/moto.model';

@Injectable({
  providedIn: 'root'
})
export class MotosService {

  private storageKey = '2ride1_motos';
  private motos: Moto[] = [];

  constructor() {
    this.cargar();
  }

  /** Carga las motos desde localStorage */
  private cargar(): void {
    try {
      const raw = localStorage.getItem(this.storageKey);
      this.motos = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error cargando motos', e);
      this.motos = [];
    }
  }

  /** Guarda las motos en localStorage */
  private guardar(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.motos));
  }

  /** Devuelve una copia de la lista de motos */
  getMotos(): Moto[] {
    return [...this.motos];
  }

  /** Agrega una nueva moto */
  agregarMoto(data: Omit<Moto, 'id'>): Moto {
    const nueva: Moto = {
      ...data,
      id: this.generarId()
    };
    this.motos.push(nueva);
    this.guardar();
    return nueva;
  }

  /** Elimina una moto por ID */
  eliminarMoto(id: string): void {
    this.motos = this.motos.filter(m => m.id !== id);
    this.guardar();
  }

  /** Buscar moto por ID (para futuro: mantenimientos) */
  getMotoById(id: string): Moto | undefined {
    return this.motos.find(m => m.id === id);
  }

  /** Genera un ID simple */
  private generarId(): string {
    // Si el navegador soporta crypto.randomUUID:
    if ((crypto as any)?.randomUUID) {
      return (crypto as any).randomUUID();
    }
    // Fallback sencillo
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}
