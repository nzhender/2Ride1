import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKeyUsuarios = '2ride1_usuarios';
  private storageKeySesion   = '2ride1_usuario_actual';
  private usuarios: Usuario[] = [];

  constructor() {
    this.cargarUsuarios();
  }

  private cargarUsuarios() {
    const raw = localStorage.getItem(this.storageKeyUsuarios);
    this.usuarios = raw ? JSON.parse(raw) : [];
  }

  private guardarUsuarios() {
    localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(this.usuarios));
  }

  private guardarSesion(usuario: Usuario | null) {
    if (usuario) {
      localStorage.setItem(this.storageKeySesion, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(this.storageKeySesion);
    }
  }

  getUsuarioActual(): Usuario | null {
    const raw = localStorage.getItem(this.storageKeySesion);
    return raw ? JSON.parse(raw) : null;
  }

  cerrarSesion() {
    this.guardarSesion(null);
  }

  registrar(nombre: string, correo: string, password: string, tipo: 'motociclista' | 'taller'): Usuario | null {
    this.cargarUsuarios();

    const existe = this.usuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase());
    if (existe) {
      return null; // ya existe usuario con ese correo
    }

    const nuevo: Usuario = {
      id: this.generarId(),
      nombre: nombre.trim(),
      correo: correo.trim(),
      password: password, // en producción debería ir hasheado
      tipo
    };

    this.usuarios.push(nuevo);
    this.guardarUsuarios();
    this.guardarSesion(nuevo);

    return nuevo;
  }

  login(correo: string, password: string): Usuario | null {
    this.cargarUsuarios();

    const usuario = this.usuarios.find(u =>
      u.correo.toLowerCase() === correo.toLowerCase() &&
      u.password === password
    );

    if (!usuario) {
      return null;
    }

    this.guardarSesion(usuario);
    return usuario;
  }

  private generarId(): string {
    if ((crypto as any)?.randomUUID) {
      return (crypto as any).randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}
