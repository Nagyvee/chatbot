// src/components/OpenAIComponent.js
import React, { useState } from 'react';
import { fetchOpenAIResponse } from './chatfunc';

const OpenAIComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const openAIResponse = await fetchOpenAIResponse(input);
      setResponse(openAIResponse.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your prompt here"
          rows="5"
          cols="40"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default OpenAIComponent;
