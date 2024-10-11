// Handle message from User and LLM Model
import { sendToFlask } from '../../Data/apiService';

export const handleSendMessage = async (input, setMessages, setInput, setLoading, messages) => {
    if (input.trim()) {
        // Add user message to messages
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput("");
        setLoading(true);

        // Send user input to Flask backend
        const response = await sendToFlask(input);
        if (response && response.message) {
            // Add bot's response to the messages
            setMessages(prevMessages => [
                ...prevMessages,
                { text: response.message, sender: 'bot' }
            ]);
        } else {
            // Handle error from the backend
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "Error getting a response from OpenAI", sender: 'bot' }
            ]);
        }

        setLoading(false);
    }
};
