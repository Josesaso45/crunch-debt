import { AlertCircle, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { letrasData, alertasVencimiento, resumenEntidades } from "@/data/mockData";
import { EstadoLetra } from "@/types/cobranzas";

export default function VistaOperativa() {
  const getEstadoBadge = (estado: EstadoLetra) => {
    const variants: Record<EstadoLetra, { variant: "default" | "secondary" | "destructive" | "outline"; color: string }> = {
      "Generada": { variant: "secondary", color: "text-muted-foreground" },
      "Enviada a Cliente": { variant: "outline", color: "text-foreground" },
      "Aceptada": { variant: "default", color: "text-primary" },
      "En Cartera": { variant: "default", color: "text-primary" },
      "En Cobranza": { variant: "outline", color: "text-warning" },
      "Descontada": { variant: "secondary", color: "text-accent" },
      "Pagada": { variant: "default", color: "text-success" },
    };

    const config = variants[estado];
    return (
      <Badge variant={config.variant} className={config.color}>
        {estado}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return `S/ ${amount.toLocaleString("es-PE")}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const esVencimientoProximo = (fecha: Date) => {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diasRestantes = Math.ceil(
      (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diasRestantes <= 3 && diasRestantes >= 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Vista Operativa</h2>
        <p className="text-muted-foreground mt-1">
          Gestión diaria de tareas y seguimiento de letras por cobrar
        </p>
      </div>

      {/* Alertas y Tareas Pendientes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-destructive/10 border-destructive/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Vencen Hoy
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {alertasVencimiento.hoy}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Letras requieren atención inmediata
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-warning/10 border-warning/30">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning-foreground">
                Vencen Mañana
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {alertasVencimiento.manana}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Preparar gestión de cobranza
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-primary/10 border-primary/30">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary">
                Próxima Semana
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {alertasVencimiento.proximaSemana}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Letras a vencer en 7 días
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla de Letras por Pagar */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Letras por Pagar - Trazabilidad Completa
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número Único</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Entidad Financiera</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {letrasData.map((letra) => (
                <TableRow
                  key={letra.numeroUnico}
                  className={
                    esVencimientoProximo(letra.fechaVencimiento) && letra.estado !== "Pagada"
                      ? "bg-warning/5"
                      : ""
                  }
                >
                  <TableCell className="font-mono text-sm">
                    {letra.numeroUnico}
                  </TableCell>
                  <TableCell>{letra.aceptante}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(letra.importe)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {formatDate(letra.fechaVencimiento)}
                      {esVencimientoProximo(letra.fechaVencimiento) &&
                        letra.estado !== "Pagada" && (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                    </div>
                  </TableCell>
                  <TableCell>{getEstadoBadge(letra.estado)}</TableCell>
                  <TableCell>
                    {letra.entidadFinanciera || (
                      <span className="text-muted-foreground italic">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Resumen por Entidad Financiera */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Resumen por Entidad Financiera
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resumenEntidades.map((entidad) => (
            <div
              key={entidad.nombre}
              className="p-4 bg-muted/50 rounded-lg space-y-2"
            >
              <p className="font-semibold text-foreground">{entidad.nombre}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">En Cobranza:</span>
                  <span className="font-medium">
                    {formatCurrency(entidad.enCobranza)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descontada:</span>
                  <span className="font-medium">
                    {formatCurrency(entidad.descontada)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(entidad.total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
