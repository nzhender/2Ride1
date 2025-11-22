export interface Mantenimiento {
  id: string;
  motoId: string;
  tipo: string;
  fecha: string;   // 'YYYY-MM-DD'
  km: number;
  costo?: number;
  notas?: string;

  // NUEVO: validación por taller
  sellado?: boolean;        // default false
  selladoPor?: string;      // nombre del taller que sella
}
