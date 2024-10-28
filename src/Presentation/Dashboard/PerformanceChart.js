// Refrence: 
"use client";

<<<<<<< HEAD
=======
<<<<<<< HEAD
import { TrendingUp } from 'lucide-react';
=======
// Import necessary components from 'recharts' and your custom card/chart components
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
>>>>>>> 0cd475becc7315f2a82cd0250bc6d48f55b2edf7
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
<<<<<<< HEAD
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
=======
  CardHeader,
  CardTitle,
} from './Card';
import {
  ChartContainer,
} from './Chart';

// Custom Tooltip Component with Background Container
export const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    // Find the original item based on the label (index)
    const originalItem = data && data[label - 1];
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {originalItem && (
          <>
            <p className="label">{`ID: ${originalItem.id}`}</p>
            {payload.map((entry, index) => (
              <p key={`item-${index}`} className="intro">
                {`${entry.name}: ${(entry.value).toFixed(2)}`}
              </p>
            ))}
          </>
        )}
      </div>
    );
  }
  return null;
};

// F1 Score Chart Component for SQuAD
export function F1ScoreChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle><h2>Bar Chart - F1 Score Metrics</h2></CardTitle>
        <CardDescription>Representation of F1 scores for sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="index" tickFormatter={(index) => `#${index}`} /> {/* Changed to use index directly */}
              <YAxis />
              <Tooltip content={<CustomTooltip data={data} />} />
              <Legend />
<<<<<<< HEAD
              <Bar dataKey="f1_score" fill="#2ecc71" radius={4} />
=======
              <Bar dataKey="f1_score" fill="#3498db" radius={4} />
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
>>>>>>> 0cd475becc7315f2a82cd0250bc6d48f55b2edf7
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
<<<<<<< HEAD
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
=======
    </Card>
  );
}

// BLEU Score Chart Component
export function BLEUScoreChart({ data }) {
  const scaledData = data.map(item => ({
    ...item,
    bleu_score_scaled: item.bleu_score * 10,  // Scale BLEU score for better visibility
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle><h2>Bar Chart - BLEU Score Metrics (Scaled by 10)</h2></CardTitle>
        <CardDescription>Representation of BLEU scores (scaled by 10 for better comparison with F1 scores).</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scaledData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="index" tickFormatter={(index) => `#${index}`} />
              <YAxis domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip data={scaledData} />} />
              <Legend />
              <Bar dataKey="bleu_score_scaled" fill="#e74c3c" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// ROUGE Score Chart Component for TruthfulQA
export function ROUGEScoreChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle><h2>Bar Chart - ROUGE Score Metrics</h2></CardTitle>
        <CardDescription>Representation of ROUGE scores for sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="index" tickFormatter={(index) => `#${index}`} />
              <YAxis />
              <Tooltip content={<CustomTooltip data={data} />} />
              <Legend />
              <Bar dataKey="rouge_score" fill="#2ecc71" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// Comparison Chart Component for F1 and BLEU Scores using dual Y-axes for SQuAD
export function ComparisonChart({ data }) {
  const scaledData = data.map(item => ({
    ...item,
    bleu_score_scaled: item.bleu_score * 1000,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle><h2>Comparison Chart - F1 vs BLEU Score (Scaled by 1000)</h2></CardTitle>
        <CardDescription>Comparison of F1 and BLEU scores across sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scaledData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="index" tickFormatter={(index) => `#${index}`} />
              <YAxis yAxisId="left" domain={[0, 'auto']} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip data={scaledData} />} />
              <Legend />
              <Bar yAxisId="left" dataKey="f1_score" fill="#2ecc71" radius={4} />
              <Bar yAxisId="right" dataKey="bleu_score_scaled" fill="#e74c3c" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// PerformanceBarChart Component Wrapper (Handles both SQuAD and TruthfulQA)
export function PerformanceBarChart({ data, selectedDataset }) {
  const transformedData = data.map((item, index) => ({
    ...item,
    index: index + 1, // Properly set the index starting from 1
  }));

  return (
    <div className="performance-bar-chart-container">
      <div className="chart-row">
        {/* For SQuAD, render F1 and BLEU Score charts */}
        {selectedDataset === 'SQuAD' && (
          <>
            <F1ScoreChart data={transformedData} />
            <BLEUScoreChart data={transformedData} />
          </>
        )}
        {/* For TruthfulQA, render BLEU and ROUGE Score charts */}
        {selectedDataset === 'TruthfulQA' && (
          <>
            <BLEUScoreChart data={transformedData} />
            <ROUGEScoreChart data={transformedData} />
          </>
        )}
      </div>
      {selectedDataset === 'SQuAD' && <ComparisonChart data={transformedData} />}
    </div>
  );
}
>>>>>>> 86289d3141b7eba0c4c8692b51298ec24ec2b13e
