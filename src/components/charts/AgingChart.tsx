import ReactECharts from "echarts-for-react";

interface AgingChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

export function AgingChart({ data }: AgingChartProps) {
  const option = {
    title: {
      text: "Aging de Cartera",
      left: "center",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        const value = params[0].value;
        return `${params[0].name}<br/>S/ ${value.toLocaleString()}`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.labels,
      axisLabel: {
        fontSize: 11,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value: number) => `S/ ${(value / 1000).toFixed(0)}k`,
      },
    },
    series: [
      {
        name: "Deuda",
        type: "bar",
        data: data.values,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#5470c6" },
              { offset: 1, color: "#91cc75" },
            ],
          },
        },
        barWidth: "60%",
      },
    ],
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-card border border-border">
      <ReactECharts option={option} style={{ height: "350px" }} />
    </div>
  );
}
