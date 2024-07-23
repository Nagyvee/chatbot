const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENAI_KEY;

class ChatSession {
    constructor(name) {
        this.name = name;
        this.messages = [
            {
                role: 'system',
                content: `You are a helpful assistant named Nayvee Chatbot. Please respond accordingly.`,
            },
        ];
    }

    async fetchOpenAIResponse(prompt) {
        const endpoint = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        };

        // Add the new user message to the chat history
        this.messages.push({ role: 'user', content: prompt });

        const data = {
            model: 'gpt-3.5-turbo',
            messages: this.messages,
            max_tokens: 150, 
            temperature: 0.7,
        };

        try {
            const response = await axios.post(endpoint, data, { headers });
            // Extract the generated response message
            const message = response.data.choices[0].message.content;
            // Format the response in HTML
            const formattedMessage = this.formatResponseAsHTML(message);
            // Add the assistant's response to the chat history
            this.messages.push({ role: 'assistant', content: formattedMessage });
            return formattedMessage;
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
            throw error;
        }
    }

    formatResponseAsHTML(message) {
        // Example of detecting and tagging different types of content
        const lines = message.split('\n').map(line => {
            if (line.startsWith('```')) {
                return `<pre><code>${line.replace(/```/g, '')}</code></pre>`;
            } else if (line.startsWith('#')) {
                return `<h1>${line.replace(/#/g, '')}</h1>`;
            } else if (line.startsWith('- ')) {
                return `<ul><li>${line.replace(/- /g, '')}</li></ul>`;
            } else if (line.match(/^\d+\./)) {
                return `<ol><li>${line.replace(/^\d+\.\s/, '')}</li></ol>`;
            } else {
                return `<p>${line}</p>`;
            }
        }).join('');
        
        return `
            <div class="chat-response">
                ${lines}
                <button class="copy-button" onclick="copyToClipboard('${message.replace(/'/g, "\\'")}')">Copy</button>
            </div>
        `;
    }
}

// Example usage:
const chat = new ChatSession('My Chat', 'Alice');

chat.fetchOpenAIResponse('Hello, Do you still remember my name')
    .then(response => {
        console.log('Assistant:', response);
        // Insert response into your web page, e.g., document.getElementById('chat-container').innerHTML = response;
    })
    .catch(error => console.error(error));

module.exports = ChatSession;
