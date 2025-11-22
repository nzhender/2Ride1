export interface Usuario {
    id: string;
    nombre: string;
    correo: string;
    password: string;
    tipo: 'motociclista' | 'taller';
  }
  