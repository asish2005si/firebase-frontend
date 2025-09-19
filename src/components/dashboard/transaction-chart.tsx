"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    color: "hsl(var(--chart-1))",
  },
  debit: {
    label: "Debit",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type TransactionChartProps = {
    data: any[];
}

export function TransactionChart({ data }: TransactionChartProps) {
  return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
           <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <defs>
              <linearGradient id="fillCredit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-credit)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-credit)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDebit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-debit)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-debit)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
          <Line
            dataKey="credit"
            type="natural"
            stroke="var(--color-credit)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="debit"
            type="natural"
            stroke="var(--color-debit)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
  )
}
