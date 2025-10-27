import { Factura, Letra, Cliente, KPI } from "@/types/cobranzas";

// KPIs principales
export const kpisEjecutivos: KPI[] = [
  {
    titulo: "Tiempo Promedio de Cobro",
    valor: 42,
    unidad: "días",
    meta: 38,
    lineaBase: 45,
    tendencia: "down",
  },
  {
    titulo: "Tasa de Error en Planillas",
    valor: 2.3,
    unidad: "%",
    meta: 1.0,
    lineaBase: 8.5,
    tendencia: "down",
  },
  {
    titulo: "Trazabilidad de Letras",
    valor: 98.5,
    unidad: "%",
    meta: 100,
    lineaBase: 75,
    tendencia: "up",
  },
];

// Aging de cartera
export const agingData = {
  labels: ["0-30 días", "31-60 días", "61-90 días", "+90 días"],
  values: [450000, 280000, 120000, 85000],
};

// Ventas vs Cobranzas (últimos 6 meses)
export const ventasCobranzasData = {
  meses: ["Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", "Enero"],
  ventas: [850000, 920000, 980000, 1050000, 1120000, 1080000],
  cobranzas: [780000, 850000, 910000, 980000, 1050000, 1020000],
};

// Letras por pagar (Vista Operativa)
export const letrasData: Letra[] = [
  {
    numeroUnico: "LT-2025-001",
    fechaVencimiento: new Date("2025-02-01"),
    importe: 15000,
    aceptante: "Comercial ABC S.A.C.",
    estado: "En Cartera",
  },
  {
    numeroUnico: "LT-2025-002",
    fechaVencimiento: new Date("2025-01-28"),
    importe: 28500,
    aceptante: "Distribuidora XYZ E.I.R.L.",
    estado: "En Cobranza",
    entidadFinanciera: "BCP",
  },
  {
    numeroUnico: "LT-2025-003",
    fechaVencimiento: new Date("2025-01-27"),
    importe: 45000,
    aceptante: "Inversiones DEF S.A.",
    estado: "En Cobranza",
    entidadFinanciera: "BCP",
  },
  {
    numeroUnico: "LT-2025-004",
    fechaVencimiento: new Date("2025-02-15"),
    importe: 32000,
    aceptante: "Grupo Comercial GHI",
    estado: "Descontada",
    entidadFinanciera: "Interbank",
  },
  {
    numeroUnico: "LT-2025-005",
    fechaVencimiento: new Date("2025-02-20"),
    importe: 18750,
    aceptante: "Importadora JKL S.R.L.",
    estado: "En Cartera",
  },
  {
    numeroUnico: "LT-2024-198",
    fechaVencimiento: new Date("2025-01-10"),
    importe: 52000,
    aceptante: "Corporación MNO S.A.C.",
    estado: "Pagada",
    entidadFinanciera: "BCP",
  },
];

// Alertas de vencimientos
export const alertasVencimiento = {
  hoy: letrasData.filter(
    (l) =>
      l.estado !== "Pagada" &&
      new Date(l.fechaVencimiento).toDateString() === new Date().toDateString()
  ).length,
  manana: letrasData.filter((l) => {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    return (
      l.estado !== "Pagada" &&
      new Date(l.fechaVencimiento).toDateString() === manana.toDateString()
    );
  }).length,
  proximaSemana: letrasData.filter((l) => {
    const hoy = new Date();
    const proximaSemana = new Date();
    proximaSemana.setDate(proximaSemana.getDate() + 7);
    const vencimiento = new Date(l.fechaVencimiento);
    return (
      l.estado !== "Pagada" && vencimiento > hoy && vencimiento <= proximaSemana
    );
  }).length,
};

// Resumen por entidad financiera
export const resumenEntidades = [
  { nombre: "BCP", enCobranza: 73500, descontada: 0, total: 73500 },
  { nombre: "Interbank", enCobranza: 0, descontada: 32000, total: 32000 },
  { nombre: "Sin entidad", enCobranza: 0, descontada: 0, total: 33750 },
];

// Clientes (Vista de Detalle)
export const clientesData: Cliente[] = [
  {
    id: "CLI-001",
    nombre: "Comercial ABC S.A.C.",
    deudaTotal: 45000,
    riesgo: "Bajo",
    facturas: [
      {
        numero: "F001-00123",
        fecha: new Date("2024-12-15"),
        cliente: "Comercial ABC S.A.C.",
        montoTotal: 15000,
        estado: "Pendiente",
      },
      {
        numero: "F001-00098",
        fecha: new Date("2024-11-20"),
        cliente: "Comercial ABC S.A.C.",
        montoTotal: 30000,
        estado: "Pagada",
      },
    ],
  },
  {
    id: "CLI-002",
    nombre: "Distribuidora XYZ E.I.R.L.",
    deudaTotal: 28500,
    riesgo: "Medio",
    facturas: [
      {
        numero: "F001-00145",
        fecha: new Date("2024-12-28"),
        cliente: "Distribuidora XYZ E.I.R.L.",
        montoTotal: 28500,
        estado: "Pendiente",
      },
    ],
  },
  {
    id: "CLI-003",
    nombre: "Inversiones DEF S.A.",
    deudaTotal: 95000,
    riesgo: "Bajo",
    facturas: [
      {
        numero: "F001-00156",
        fecha: new Date("2024-12-30"),
        cliente: "Inversiones DEF S.A.",
        montoTotal: 45000,
        estado: "Pendiente",
      },
      {
        numero: "F001-00110",
        fecha: new Date("2024-11-15"),
        cliente: "Inversiones DEF S.A.",
        montoTotal: 50000,
        estado: "Pagada",
      },
    ],
  },
];
