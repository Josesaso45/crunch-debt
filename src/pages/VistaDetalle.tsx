import { useState } from "react";
import { Search, FileText, TrendingDown, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clientesData } from "@/data/mockData";
import { Cliente } from "@/types/cobranzas";

export default function VistaDetalle() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const filteredClientes = clientesData.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.facturas.some((f) =>
        f.numero.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const getRiesgoBadge = (riesgo: Cliente["riesgo"]) => {
    const variants = {
      Bajo: { variant: "default" as const, color: "text-success" },
      Medio: { variant: "outline" as const, color: "text-warning" },
      Alto: { variant: "destructive" as const, color: "text-destructive" },
    };
    const config = variants[riesgo];
    return (
      <Badge variant={config.variant} className={config.color}>
        {riesgo}
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Vista de Detalle</h2>
        <p className="text-muted-foreground mt-1">
          Información transaccional y detalle por cliente
        </p>
      </div>

      {/* Buscador Global */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por cliente, número de factura o letra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Clientes */}
        <Card className="p-4 lg:col-span-1">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Clientes ({filteredClientes.length})
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredClientes.map((cliente) => (
              <button
                key={cliente.id}
                onClick={() => setSelectedCliente(cliente)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedCliente?.id === cliente.id
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-foreground text-sm">
                    {cliente.nombre}
                  </p>
                  {getRiesgoBadge(cliente.riesgo)}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  ID: {cliente.id}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {cliente.deudaTotal > 0 ? (
                    <TrendingDown className="h-4 w-4 text-warning" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-success" />
                  )}
                  <span className="text-sm font-semibold">
                    {formatCurrency(cliente.deudaTotal)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detalle del Cliente */}
        <div className="lg:col-span-2 space-y-6">
          {selectedCliente ? (
            <>
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {selectedCliente.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedCliente.id}
                    </p>
                  </div>
                  {getRiesgoBadge(selectedCliente.riesgo)}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Deuda Total
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(selectedCliente.deudaTotal)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Facturas Activas
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {
                        selectedCliente.facturas.filter(
                          (f) => f.estado !== "Pagada"
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Historial de Facturas
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCliente.facturas.map((factura) => (
                      <TableRow key={factura.numero}>
                        <TableCell className="font-mono text-sm">
                          {factura.numero}
                        </TableCell>
                        <TableCell>{formatDate(factura.fecha)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(factura.montoTotal)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              factura.estado === "Pagada"
                                ? "default"
                                : factura.estado === "Pendiente"
                                ? "outline"
                                : "destructive"
                            }
                            className={
                              factura.estado === "Pagada"
                                ? "text-success"
                                : factura.estado === "Pendiente"
                                ? "text-warning"
                                : "text-destructive"
                            }
                          >
                            {factura.estado}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Timeline de Proceso */}
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Flujo del Proceso
                </h4>
                <div className="relative pl-8">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
                  {[
                    { paso: "Pedido Registrado", estado: "completado" },
                    { paso: "Factura Emitida", estado: "completado" },
                    { paso: "Letra Generada", estado: "completado" },
                    { paso: "En Cobranza", estado: "actual" },
                    { paso: "Pago Recibido", estado: "pendiente" },
                  ].map((item, index) => (
                    <div key={index} className="relative mb-8 last:mb-0">
                      <div
                        className={`absolute -left-6 w-4 h-4 rounded-full border-2 ${
                          item.estado === "completado"
                            ? "bg-success border-success"
                            : item.estado === "actual"
                            ? "bg-primary border-primary"
                            : "bg-muted border-border"
                        }`}
                      />
                      <div>
                        <p
                          className={`font-medium ${
                            item.estado === "pendiente"
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {item.paso}
                        </p>
                        {item.estado === "actual" && (
                          <p className="text-sm text-primary mt-1">
                            En proceso...
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Selecciona un Cliente
              </h3>
              <p className="text-muted-foreground">
                Elige un cliente de la lista para ver su información detallada
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
