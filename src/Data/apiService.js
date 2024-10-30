// Helper function to send the query to the Flask API 
// Reference: https://dev.to/ondiek/sending-data-from-react-to-flask-apm
export const sendToFlask = async (query) => {
    try {
        const response = await fetch('http://localhost:5000/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching response:", error);
    }
};
