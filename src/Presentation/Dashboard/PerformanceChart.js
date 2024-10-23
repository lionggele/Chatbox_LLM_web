"use client";

// Import necessary components from 'recharts' and your custom card/chart components
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
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Black background with 40% opacity
          color: "#fff", // White text for better contrast
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {originalItem && (
          <>
            <p className="label">{`ID: ${originalItem.id}`}</p>
            {payload.map((entry, index) => (
              <p key={`item-${index}`} className="intro">
                {`${entry.name}: ${entry.name === 'bleu_score_scaled' ? (entry.value).toFixed(2) : entry.value.toFixed(2)}`}
              </p>
            ))}
          </>
        )}
      </div>
    );
  }
  return null;
};

// F1 Score Chart Component
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
              <Bar dataKey="f1_score" fill="#3498db" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// BLEU Score Chart Component with BLEU Scores Scaled by 100
export function BLEUScoreChart({ data }) {
  // Create a transformed version of data that scales BLEU score specifically for the BLEU Score Chart
  const scaledData = data.map(item => ({
    ...item,
    bleu_score_scaled: item.bleu_score * 10, // Scale BLEU score for better visibility in this specific chart
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
              <YAxis domain={[0, 'auto']} /> {/* Adjusted Y-axis domain to fit BLEU score values */}
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

// Comparison Chart Component for F1 and Scaled BLEU Scores using dual Y-axes
export function ComparisonChart({ data }) {
  // Create a transformed version of data that scales BLEU score specifically for comparison
  const scaledData = data.map(item => ({
    ...item,
    bleu_score_scaled: item.bleu_score * 1000, // Scale BLEU score for comparison only
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle><h2>Comparison Chart - F1 vs BLEU Score (Scaled by 1000)</h2></CardTitle>
        <CardDescription>Comparison of F1 and BLEU scores (scaled by 1000) across sampled responses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scaledData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="index" tickFormatter={(index) => `#${index}`} /> {/* Changed to use index directly */}
              <YAxis yAxisId="left" domain={[0, 'auto']} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 'auto']} /> {/* Adding a right Y-axis for scaled BLEU score */}
              <Tooltip content={<CustomTooltip data={scaledData} />} />
              <Legend />
              <Bar yAxisId="left" dataKey="f1_score" fill="#3498db" radius={4} />
              <Bar yAxisId="right" dataKey="bleu_score_scaled" fill="#e74c3c" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// PerformanceBarChart Component Wrapper
export function PerformanceBarChart({ data }) {
  // Map the data to add a numeric index for each entry, starting from 1
  const transformedData = data.map((item, index) => ({
    ...item,
    index: index + 1, // Properly set the index starting from 1
  }));

  return (
    <div className="performance-bar-chart-container">
      <div className="chart-row">
        <F1ScoreChart data={transformedData} />
        <BLEUScoreChart data={transformedData} />
      </div>
      <ComparisonChart data={transformedData} />
    </div>
  );
}
