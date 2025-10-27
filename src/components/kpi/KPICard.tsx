import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { KPI } from "@/types/cobranzas";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const getTrendIcon = () => {
    if (kpi.tendencia === "up") return <ArrowUp className="h-4 w-4" />;
    if (kpi.tendencia === "down") return <ArrowDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (kpi.tendencia === "up") return "text-success";
    if (kpi.tendencia === "down") return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6 shadow-card border-border hover:shadow-elegant transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {kpi.titulo}
          </p>
          <p className="text-3xl font-bold text-foreground">
            {kpi.valor} <span className="text-lg text-muted-foreground">{kpi.unidad}</span>
          </p>
        </div>
        <div className={`p-2 rounded-full ${getTrendColor()}`}>
          {getTrendIcon()}
        </div>
      </div>
      {kpi.meta && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Meta:</span>
            <span className="font-medium text-success">{kpi.meta} {kpi.unidad}</span>
          </div>
        </div>
      )}
    </Card>
  );
}
