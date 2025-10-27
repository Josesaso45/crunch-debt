import ReactECharts from "echarts-for-react";

interface TrendChartProps {
  data: {
    meses: string[];
    ventas: number[];
    cobranzas: number[];
  };
}

export function TrendChart({ data }: TrendChartProps) {
  const option = {
    title: {
      text: "Tendencia: Ventas vs Cobranzas",
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        let result = `${params[0].name}<br/>`;
        params.forEach((param: any) => {
          result += `${param.marker} ${param.seriesName}: S/ ${param.value.toLocaleString()}<br/>`;
        });
        return result;
      },
    },
    legend: {
      data: ["Ventas", "Cobranzas"],
      top: "30px",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.meses,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: number) => `S/ ${(value / 1000).toFixed(0)}k`,
      },
    },
    series: [
      {
        name: "Ventas",
        type: "line",
        data: data.ventas,
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#5470c6",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(84, 112, 198, 0.3)" },
              { offset: 1, color: "rgba(84, 112, 198, 0.05)" },
            ],
          },
        },
      },
      {
        name: "Cobranzas",
        type: "line",
        data: data.cobranzas,
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#91cc75",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(145, 204, 117, 0.3)" },
              { offset: 1, color: "rgba(145, 204, 117, 0.05)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-card border border-border">
      <ReactECharts option={option} style={{ height: "350px" }} />
    </div>
  );
}
