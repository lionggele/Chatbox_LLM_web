import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    Card,
    CardHeader,
    Typography,
    CardContent,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    Legend as RechartsLegend,
    Bar as ReBar,
} from 'recharts';
import '../../style/App.css';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Leaderboard() {
    const [modelAverages, setModelAverages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDataset, setSelectedDataset] = useState('Selected the dataset');

    // Function to fetch model averages
    const fetchModelAverages = async () => {
        setLoading(true);
        try {
            console.log(selectedDataset);
            const response = await fetch(`http://localhost:5000/api/get_model_averages?dataset=${selectedDataset}`);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setModelAverages(result);
            } else {
                console.error('Failed to fetch model averages');
            }
        } catch (error) {
            console.error('Error fetching model averages:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to generate insights about the chart
    function generateChartAnalysis(modelAverages) {
        if (modelAverages.length === 0) {
            return 'No data available for analysis.';
        }
        const bestModel = modelAverages.reduce((prev, curr) => (prev.average_f1_score > curr.average_f1_score ? prev : curr));
        return `The best performing model is ${bestModel.model} with an average F1 score of ${bestModel.average_f1_score.toFixed(
            2
        )} and an average BLEU score of ${bestModel.average_bleu_score.toFixed(2)}.`;
    }

    // Data for the Chart.js chart
    const chartData = {
        labels: modelAverages.map((model) => model.model),
        datasets: [
            {
                label: 'Average F1 Score',
                data: modelAverages.map((model) => model.average_f1_score),
                backgroundColor: '#4caf50',
            },
            {
                label: 'Average BLEU Score',
                data: modelAverages.map((model) => model.average_bleu_score),
                backgroundColor: '#81c784',
            },
        ],
    };

    // Recharts Chart with dual Y-Axis
    const scaledData = modelAverages.map((item) => ({
        ...item,
        bleu_score_scaled: item.average_bleu_score * 1000,
    }));

    return (
        <div className="leaderboard-container">
            <h3 className="title-performanceboard">Leaderboard - Model Performance</h3>

            {/* Dropdown for Dataset Selection */}
            <FormControl variant="outlined" className="form-control">
                <InputLabel>Select Dataset</InputLabel>
                <Select
                    value={selectedDataset}
                    onChange={(e) => setSelectedDataset(e.target.value)}
                    label="Select Dataset"
                >
                    <MenuItem value="SQuAD">SQuAD</MenuItem>
                    <MenuItem value="Truthful">Truthful</MenuItem>
                    {/* Add more dataset options as needed */}
                </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={fetchModelAverages}
                disabled={loading}
                style={{ margin: '20px 0' }}
            >
                {loading ? 'Loading...' : 'Submit'}
            </Button>

            {/* Leaderboard Table */}
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Model</th>
                        <th>Average F1 Score</th>
                        <th>Average BLEU Score</th>
                    </tr>
                </thead>
                <tbody>
                    {modelAverages
                        .map((model, index) => (
                            <tr key={model.model}>
                                <td>{index + 1}</td>
                                <td>{model.model}</td>
                                <td>{model.average_f1_score.toFixed(2)}</td>
                                <td>{model.average_bleu_score.toFixed(2)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Chart.js Chart
            <div className="chart-container-leaderboard">
                <h3 className="chart-title">Model Comparison Chart (Bar Chart)</h3>
                <p className="chart-subtitle">Comparison of average F1 and BLEU scores for different models.</p>
                <div className="chart-element">
                    <Bar data={chartData} key={JSON.stringify(chartData)} />
                </div>
            </div> */}

            {/* Dual Y-Axis Chart */}
            <Card className="card-container">
                <CardHeader
                    title="Model Comparison Chart (Bar Chart)"
                    subheader="Comparison of average F1 and BLEU scores for different models."
                    titleTypographyProps={{ align: 'center', variant: 'h5', fontWeight: 'bold' }}
                    subheaderTypographyProps={{ align: 'center', variant: 'body1' }}
                />
                <CardContent>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={scaledData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="model" />
                                <YAxis yAxisId="left" domain={[0, 'auto']} />
                                <YAxis yAxisId="right" orientation="right" domain={[0, 'auto']} />
                                <RechartsTooltip />
                                <RechartsLegend />
                                <ReBar yAxisId="left" dataKey="average_f1_score" fill="#3498db" radius={[4, 4, 0, 0]} />
                                <ReBar yAxisId="right" dataKey="bleu_score_scaled" fill="#e74c3c" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>



            <div className="message-corner">
                <h3 className="title-performanceboard">ChatGPT Analysis</h3>
                <p>{generateChartAnalysis(modelAverages)}</p>
            </div>
        </div >
    );
}

export default Leaderboard;
