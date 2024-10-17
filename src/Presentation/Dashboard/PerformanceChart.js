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
  // ChartTooltip,
  ChartTooltipContent,
} from './Chart';

export const description = "A multiple bar chart";

// F1 Score Chart Component
export function F1ScoreChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - F1 Score Metrics</CardTitle>
        <CardDescription>Representation of F1 scores for sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="f1_score" fill="hsl(var(--chart-1))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing F1 score metrics for sampled responses.
        </div>
      </CardFooter>
    </Card>
  );
}

// BLEU Score Chart Component
export function BLEUScoreChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - BLEU Score Metrics</CardTitle>
        <CardDescription>Representation of BLEU scores for sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="bleu_score" fill="hsl(var(--chart-2))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 3.4% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing BLEU score metrics for sampled responses.
        </div>
      </CardFooter>
    </Card>
  );
}

// Comparison Chart Component for F1 and BLEU Scores
export function ComparisonChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparison Chart - F1 vs BLEU Score</CardTitle>
        <CardDescription>Comparison of F1 and BLEU scores across sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="f1_score" fill="hsl(var(--chart-1))" radius={4} />
              <Bar dataKey="bleu_score" fill="hsl(var(--chart-2))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 4.3% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Comparing F1 and BLEU scores for sampled responses.
        </div>
      </CardFooter>
    </Card>
  );
}

// PerformanceBarChart Component Wrapper
export function PerformanceBarChart({ data }) {
  return (
    <div>
      <F1ScoreChart data={data} />
      <BLEUScoreChart data={data} />
      <ComparisonChart data={data} />
    </div>
  );
}
