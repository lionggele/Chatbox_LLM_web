// Refrence: 
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
              <Bar dataKey="f1_score" fill="#2ecc71" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
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
