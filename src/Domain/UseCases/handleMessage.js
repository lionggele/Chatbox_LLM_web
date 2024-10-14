// // Handle message from User and LLM Model
// import { sendToFlask } from '../../Data/apiService';
// import { fetchResponseFromModel } from '../../Domain/UseCases/handleModel';



// // Domain/UseCases/handleMessage.js

// export const handleSendMessage = async (input, setMessages, selectedModel, setLoading, messages) => {
//     setLoading(true);
    
//     try {
//         const response = await fetch('/api/query', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 query: input,
//                 models: [selectedModel],  // Send the selected model to the API
//             }),
//         });

//         const data = await response.json();
        
//         // Update messages with the model's response
//         setMessages([...messages, { text: input, sender: 'user' }, { text: data[selectedModel], sender: 'bot' }]);
//     } catch (error) {
//         console.error("Error sending message:", error);
//         setMessages([...messages, { text: "Error sending message", sender: 'bot' }]);
//     } finally {
//         setLoading(false);
//     }
// };


// // Testingggg
// export const handleSendMessage_diffLLM = async (
//     input,
//     setMessagesModel1,
//     messagesModel1,
//     setMessagesModel2,
//     messagesModel2,
//     selectedModel1,
//     selectedModel2,
//     setLoading
//   ) => {
//     const newMessage = { text: input, sender: 'user' };
  
//     setMessagesModel1([...messagesModel1, newMessage]);
//     setMessagesModel2([...messagesModel2, newMessage]);

//     setLoading(true);
//     try {
//       const response1 = await fetchResponseFromModel(selectedModel1, input);
//       const response2 = await fetchResponseFromModel(selectedModel2, input);
  
//       setMessagesModel1((prevMessages) => [...prevMessages, { text: response1, sender: 'bot' }]);
//       setMessagesModel2((prevMessages) => [...prevMessages, { text: response2, sender: 'bot' }]);
//     } catch (error) {
//       console.error("Error fetching model responses:", error);
//     }
//     setLoading(false);
//   };

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
