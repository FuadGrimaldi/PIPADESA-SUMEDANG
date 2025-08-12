"use client";

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

interface PieChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  title?: string;
}

export default function DynamicPieChart({
  data,
  width = 300,
  height = 300,
  title,
}: PieChartProps) {
  const formattedData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.label,
  }));

  const valueFormatter = (item: { value: number }) => `${item.value}`;

  return (
    <div className="flex flex-col items-center justify-center">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <PieChart
        series={[
          {
            data: formattedData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter: valueFormatter,
          },
        ]}
        width={width}
        height={height}
      />
    </div>
  );
}
