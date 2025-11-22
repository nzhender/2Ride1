export interface Recordatorio {
    id: string;
    motoId: string;        // ID de la moto asociada
    tipoServicio: string;  // ej: "Cambio de aceite"
    tipoRecordatorio: 'fecha' | 'km';
    fechaObjetivo?: string; // YYYY-MM-DD cuando tipoRecordatorio = 'fecha'
    kmObjetivo?: number;    // cuando tipoRecordatorio = 'km'
    activo: boolean;
  }
  