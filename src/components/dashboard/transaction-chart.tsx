
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
  credit: {
    label: "Credit",
    color: "hsl(var(--chart-2))",
  },
  debit: {
    label: "Debit",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

type TransactionChartProps = {
    data: any[];
}

export function TransactionChart({ data }: TransactionChartProps) {
  return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
           <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="credit" fill="var(--color-credit)" radius={4} />
          <Bar dataKey="debit" fill="var(--color-debit)" radius={4} />
        </BarChart>
      </ChartContainer>
  )
}
