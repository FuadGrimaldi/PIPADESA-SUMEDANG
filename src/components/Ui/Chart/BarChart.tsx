"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface DynamicBarChartProps {
  categories: string[]; // label di X Axis
  series: { label: string; data: number[] }[]; // data tiap kategori
  width?: number;
  height?: number;
  title?: string;
}

export default function DynamicBarChart({
  categories,
  series,
  width = 500,
  height = 400,
  title,
}: DynamicBarChartProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      <BarChart
        xAxis={[{ data: categories, scaleType: "band" }]}
        series={series}
        width={width}
        height={height}
      />
    </div>
  );
}
