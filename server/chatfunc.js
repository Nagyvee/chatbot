const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENAI_KEY;

class ChatSession {
    constructor() {
        this.messages = [
            {
                role: 'system',
                content: `You are a helpful assistant named Nayvee Chatbot. Please respond accordingly.`,
            }
        ];
    }

    async fetchOpenAIResponse(prompt) {
        const endpoint = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        };

        // Add the user message to the chat history
        this.messages.push({ role: 'user', content: prompt });

        const data = {
            model: 'gpt-4o-mini',
            messages: this.messages,
            max_tokens: 150, 
            temperature: 1,
        };

        try {
            const response = await axios.post(endpoint, data, { headers });
            // Extract the generated response message
            const message = response.data.choices[0].message.content;
            // Add the assistant's response to the chat history
            this.messages.push({ role: 'assistant', content: message });
            
            // Format the response in HTML
            const formattedMessage = this.formatResponseAsHTML(message);

            // Add the system message for suggesting a topic
            this.messages.push({
                role: 'system',
                content: 'Suggest a relevant topic for the user to ask about next.',
            });

            // Fetch the topic suggestion from OpenAI
            const topicSuggestion = await this.fetchTopicSuggestion();

            // Add the topic suggestion to the chat history
            this.messages.push({ role: 'assistant', content: `Suggested topic: ${topicSuggestion}` });

            // Save the chat session to the database
            // await this.saveChatSession();

            return formattedMessage;
        } catch (error) {
            console.error('Error fetching OpenAI response:', error);
            throw error;
        }
    }

    async fetchTopicSuggestion() {
        const endpoint = 'https://api.openai.com/v1/chat/completions';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        };

        const data = {
            model: 'gpt-3.5-turbo',
            messages: this.messages,
            max_tokens: 50, 
            temperature: 0.7,
        };

        try {
            const response = await axios.post(endpoint, data, { headers });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error fetching topic suggestion:', error);
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
const chat = new ChatSession('Alice');

chat.fetchOpenAIResponse('how to revers string in js')
    .then(response => {
        console.log('Assistant:', response);
        // Insert response into your web page, e.g., document.getElementById('chat-container').innerHTML = response;
    })
    .catch(error => console.error(error));

module.exports = ChatSession;
