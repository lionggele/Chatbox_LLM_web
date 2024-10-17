"use client";

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

import {
  ChartContainer,
  //ChartTooltip,
  ChartTooltipContent,
} from './Chart';

export const description = "A multiple bar chart";

const chartData = [
  { name: "Sample 1", f1Score: 0.93, bleuScore: 0.87 },
  { name: "Sample 2", f1Score: 0.82, bleuScore: 0.76 },
  { name: "Sample 3", f1Score: 0.74, bleuScore: 0.69 },
];

const chartConfig = {
  f1Score: {
    label: "F1 Score",
    color: "hsl(var(--chart-1))",
  },
  bleuScore: {
    label: "BLEU Score",
    color: "hsl(var(--chart-2))",
  },
};

export function PerformanceBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Performance Metrics</CardTitle>
        <CardDescription>Dynamic representation of performance metrics for F1 and BLEU scores.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="f1Score" fill="var(--color-f1Score)" radius={4} />
              <Bar dataKey="bleuScore" fill="var(--color-bleuScore)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing performance metrics for sampled responses.
        </div>
      </CardFooter>
    </Card>
  );
}
