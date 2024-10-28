// // Handle message from User and LLM Model
export const handleSendMessage = async (input, setMessages, selectedModel, setLoading, messages) => {
    setLoading(true);

    try {
        const response = await fetch('http://localhost:5000/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: input,
                models: [selectedModel],
            }),
        });

        const data = await response.json();

        // Update messages with the model's response
        setMessages([...messages, { text: input, sender: 'user' }, { text: data[selectedModel], sender: 'bot' }]);
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages([...messages, { text: "Error sending message", sender: 'bot' }]);
    } finally {
        setLoading(false);
    }
};
