import { GaugeChart } from "@/components/charts/GaugeChart";
import { AgingChart } from "@/components/charts/AgingChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { KPICard } from "@/components/kpi/KPICard";
import { kpisEjecutivos, agingData, ventasCobranzasData } from "@/data/mockData";

export default function VistaEjecutiva() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Vista Ejecutiva</h2>
        <p className="text-muted-foreground mt-1">
          Panel estratégico con KPIs y métricas clave de desempeño
        </p>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpisEjecutivos.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Gráficos Detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GaugeChart kpi={kpisEjecutivos[0]} />
        <div className="bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Tasa de Error en Planillas
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Actual</span>
              <span className="text-2xl font-bold text-foreground">
                {kpisEjecutivos[1].valor}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div
                className="bg-gradient-primary h-4 rounded-full transition-all"
                style={{ width: `${kpisEjecutivos[1].valor * 10}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Meta: {kpisEjecutivos[1].meta}%</span>
              <span>Línea Base: {kpisEjecutivos[1].lineaBase}%</span>
            </div>
            <div className="mt-4 p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-success-foreground">
                ✓ Reducción del {((kpisEjecutivos[1].lineaBase! - kpisEjecutivos[1].valor) / kpisEjecutivos[1].lineaBase! * 100).toFixed(1)}% respecto a la línea base
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Financieras */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgingChart data={agingData} />
        <TrendChart data={ventasCobranzasData} />
      </div>
    </div>
  );
}
