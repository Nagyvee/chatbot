// src/services/openaiService.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_KEY; 

export const fetchOpenAIResponse = async (prompt) => {
    const endpoint = 'https://api.openai.com/v1/completions';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    };

    const data = {
        model: 'gpt-3.5-turbo', 
        prompt: 'Your prompt here',
        max_tokens: 25, 
        temperature: 0.7, 
      };

  try {
    const response = await axios.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    throw error;
  }
};
