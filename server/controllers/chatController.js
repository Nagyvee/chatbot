const fetchOpenAIResponse = require("../openai");

const chatController = async (req,res) => {
    const {history, sender, message, chatId } = req.body; 
    try {
        const data = await fetchOpenAIResponse(history, message);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to fetch OpenAI response.'});
    }
}

module.exports = {chatController};