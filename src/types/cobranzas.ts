export interface Factura {
  numero: string;
  fecha: Date;
  cliente: string;
  montoTotal: number;
  estado: "Pendiente" | "Pagada" | "No Pagada";
}

export type EstadoLetra =
  | "Generada"
  | "Enviada a Cliente"
  | "Aceptada"
  | "En Cartera"
  | "En Cobranza"
  | "Descontada"
  | "Pagada";

export interface Letra {
  numeroUnico: string;
  fechaVencimiento: Date;
  importe: number;
  aceptante: string;
  estado: EstadoLetra;
  entidadFinanciera?: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  deudaTotal: number;
  facturas: Factura[];
  riesgo: "Bajo" | "Medio" | "Alto";
}

export interface KPI {
  titulo: string;
  valor: number;
  unidad: string;
  meta?: number;
  lineaBase?: number;
  tendencia?: "up" | "down" | "neutral";
}
