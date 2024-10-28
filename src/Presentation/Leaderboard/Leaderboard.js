import React, { useState } from 'react';
import {
    Card,
    CardHeader,
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

function Leaderboard() {
    const [modelAverages, setModelAverages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDataset, setSelectedDataset] = useState('Select a dataset');

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

    //this is just for fun, the inital plan is to use Chatgpt to evaluate the evaluated result. but last to do. hahah 
    function generateChartAnalysis(modelAverages) {
        if (modelAverages.length === 0) {
            return 'No data available for analysis.';
        }
        const bestModel = modelAverages.reduce((prev, curr) =>
            (prev.average_f1_score || 0) > (curr.average_f1_score || 0) ? prev : curr
        );
        return `The best performing model is ${bestModel.model} with an average F1 score of ${bestModel.average_f1_score?.toFixed(2) || 'N/A'}, an average BLEU score scaled by 10 of ${bestModel.average_bleu_score?.toFixed(2) || 'N/A'}, and an average ROUGE score scaled by 1000 of ${bestModel.average_rouge_score?.toFixed(2) || 'N/A'}.`;
    }


    const scaledData = modelAverages.map((item) => ({
        ...item,
        bleu_score_scaled: (item.average_bleu_score || 0) * 1000,
        rouge_score_scaled: (item.average_rouge_score || 0) * 1000,
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
                    <MenuItem value="TruthfulQA">TruthfulQA</MenuItem>
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
                        {selectedDataset === 'SQuAD' && <th>Average F1 Score</th>}
                        <th>Average BLEU Score (scaled by 1000)</th>
                        {selectedDataset === 'TruthfulQA' && <th>Average ROUGE Score (scaled by 1000)</th>}
                    </tr>
                </thead>
                <tbody>
                    {modelAverages.map((model, index) => (
                        <tr key={model.model}>
                            <td>{index + 1}</td>
                            <td>{model.model}</td>
                            {selectedDataset === 'SQuAD' && (
                                <td>{model.average_f1_score != null ? model.average_f1_score.toFixed(2) : 'N/A'}</td>
                            )}
                            <td>{model.average_bleu_score != null ? (model.average_bleu_score * 1000).toFixed(2) : 'N/A'}</td>
                            {selectedDataset === 'TruthfulQA' && (
                                <td>{model.average_rouge_score != null ? (model.average_rouge_score * 1000).toFixed(2) : 'N/A'}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dual Y-Axis Chart */}
            <Card className="card-container">
                <CardHeader
                    title="Model Comparison Chart (Bar Chart) - BLEU Scaled by 1000, ROUGE Scaled by 1000"
                    subheader="Comparison of average metrics for different models."
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
                                {selectedDataset === 'SQuAD' && (
                                    <ReBar yAxisId="left" dataKey="average_f1_score" fill="#2ecc71" radius={[4, 4, 0, 0]} />
                                )}
                                <ReBar yAxisId="right" dataKey="bleu_score_scaled" fill="#e74c3c" radius={[4, 4, 0, 0]} />
                                {selectedDataset === 'TruthfulQA' && (
                                    <ReBar yAxisId="right" dataKey="rouge_score_scaled" fill="#2ecc71" radius={[4, 4, 0, 0]} />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Generated ChatGPT Analysis Messages */}
            <div className="message-corner">
                <h3 className="title-performanceboard">ChatGPT Analysis</h3>
                <p>{generateChartAnalysis(modelAverages)}</p>
            </div>
        </div>
    );
}

export default Leaderboard;
