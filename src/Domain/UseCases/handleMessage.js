// Handle message from User and LLM Model
import { sendToFlask } from '../../Data/apiService';
import { fetchResponseFromModel } from '../../Domain/UseCases/handleModel';



export const handleSendMessage = async (input, setMessages, setInput, setLoading, messages) => {
    if (input.trim()) {
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput("");
        setLoading(true);
        const response = await sendToFlask(input);
        if (response && response.message) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: response.message, sender: 'bot' }
            ]);
        } else {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "Error getting a response", sender: 'bot' }
            ]);
        }
        setLoading(false);
    }
};

// Testingggg
export const handleSendMessage_diffLLM = async (
    input,
    setMessagesModel1,
    messagesModel1,
    setMessagesModel2,
    messagesModel2,
    selectedModel1,
    selectedModel2,
    setLoading
  ) => {
    const newMessage = { text: input, sender: 'user' };
  
    setMessagesModel1([...messagesModel1, newMessage]);
    setMessagesModel2([...messagesModel2, newMessage]);

    setLoading(true);
    try {
      const response1 = await fetchResponseFromModel(selectedModel1, input);
      const response2 = await fetchResponseFromModel(selectedModel2, input);
  
      setMessagesModel1((prevMessages) => [...prevMessages, { text: response1, sender: 'bot' }]);
      setMessagesModel2((prevMessages) => [...prevMessages, { text: response2, sender: 'bot' }]);
    } catch (error) {
      console.error("Error fetching model responses:", error);
    }
    setLoading(false);
  };