
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { category: "Food", amount: 86, fill: "var(--color-food)" },
  { category: "Bills", amount: 300, fill: "var(--color-bills)" },
  { category: "Travel", amount: 200, fill: "var(--color-travel)" },
  { category: "Shopping", amount: 275, fill: "var(--color-shopping)" },
]

const chartConfig = {
  amount: {
    label: "Amount",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  bills: {
    label: "Bills",
    color: "hsl(var(--chart-2))",
  },
  travel: {
    label: "Travel",
    color: "hsl(var(--chart-3))",
  },
  shopping: {
    label: "Shopping",
    color: "hsl(var(--chart-4))",
  },
}

export function ExpenseChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: -20,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" dataKey="amount" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="amount" layout="vertical" radius={5}>
             <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-foreground"
                fontSize={12}
            />
             <LabelList
                dataKey="amount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                 formatter={(value: number) => `₹${value}`}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
  )
}
