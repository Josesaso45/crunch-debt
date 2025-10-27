import ReactECharts from "echarts-for-react";
import { KPI } from "@/types/cobranzas";

interface GaugeChartProps {
  kpi: KPI;
}

export function GaugeChart({ kpi }: GaugeChartProps) {
  const porcentaje = kpi.meta ? ((kpi.meta - kpi.valor) / (kpi.lineaBase! - kpi.meta)) * 100 : 0;
  
  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 200,
        endAngle: -20,
        min: Math.min(kpi.valor, kpi.meta || 0, kpi.lineaBase || 0) * 0.8,
        max: Math.max(kpi.valor, kpi.meta || 0, kpi.lineaBase || 0) * 1.2,
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, "#67e0e3"],
              [0.7, "#37a2da"],
              [1, "#fd666d"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 4,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: `{value} ${kpi.unidad}`,
          color: "inherit",
          fontSize: 20,
          offsetCenter: [0, "70%"],
        },
        data: [
          {
            value: kpi.valor,
            name: kpi.titulo,
          },
        ],
        title: {
          offsetCenter: [0, "-30%"],
          fontSize: 14,
        },
      },
    ],
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-card border border-border">
      <ReactECharts option={option} style={{ height: "300px" }} />
      <div className="mt-2 text-sm text-muted-foreground space-y-1">
        <div className="flex justify-between">
          <span>Meta:</span>
          <span className="font-medium text-success">{kpi.meta} {kpi.unidad}</span>
        </div>
        <div className="flex justify-between">
          <span>Línea Base:</span>
          <span className="font-medium">{kpi.lineaBase} {kpi.unidad}</span>
        </div>
        <div className="flex justify-between">
          <span>Progreso:</span>
          <span className="font-medium text-primary">{porcentaje.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}
