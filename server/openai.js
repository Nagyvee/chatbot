const axios = require('axios');
require('dotenv').config();
const openai = require('openai');
const API_KEY = process.env.OPENAI_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';
const imgEndPoint = 'https://api.openai.com/v1/images/generations';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
};

const fetchOpenAIResponse = async (history, prompt) => {                                     
    let chatHistory = [
        {
            role: 'system',
            content: 'You are a helpful assistant named Nayvee. Please respond accordingly.',
        },
    ];

    if(history !== undefined && history.length > 0){
        let prevHistory;
        if(history.length > 8){
            prevHistory = history.slice(-8)
        }else{
            prevHistory = history
        }
          prevHistory.forEach((item) =>{
            if(item.sender === 'user'){
                chatHistory.push({ role: 'user', content: item.message });
            }else{
                chatHistory.push({ role: 'assistant', content: item.message });
            }
        })
    }
    // Add the new user message to the chat history
    chatHistory.push({ role: 'user', content: prompt });

    const data = {
        model: 'gpt-4o-mini', 
        messages: chatHistory,
        max_tokens: 650,
        temperature: 0.9,
    };

    try {
        const response = await axios.post(endpoint, data, { headers });
        // Extract the generated response message
        const message = response.data.choices[0].message.content;
        // Add the assistant's response to the chat history
        chatHistory.push({ role: 'assistant', content: message });
        return message;
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        throw error;
    }
};

const imageGenerate = async (message) =>{
const imgData = {
    model: "dall-e-2",
    prompt: message,
    n: 1,
    size: "1024x1024",
  };

  try {
    const response = await axios.post(imgEndPoint, imgData, { headers });
    // Extract the generated response message
    const imgUrl = response.data.data[0].url;
    // return image url;
    return imgUrl;
} catch (error) {
    throw error;
}
  
}

module.exports = {fetchOpenAIResponse, imageGenerate};

