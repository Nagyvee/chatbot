const fetchOpenAIResponse = require("../openai");
const pool = require("../connectdb");

const chatController = async (req, res) => {
  const { userId, history, sender, message, chatId } = req.body;

  try {
    const addMessageQuery = `INSERT INTO chatbot_messages(chat_id,content, sender) VALUES(?,?,?)`;

     const data = await fetchOpenAIResponse(history, message);
    
     if (history.length === 0 || history === undefined) {
      const chatQuery = `INSERT INTO chatbot_chats(id,topic) VALUES(?,?)`;
      const userChatsQuery = `INSERT INTO user_chats(user_id,chat_id) VALUES(?,?)`;
      let topicContent;
      if(message.length > 40){
        topicContent = message.slice(0, 40) + '...'
      }else{
        topicContent = message
      }
      await pool.promise().query(chatQuery, [chatId, topicContent]);
      await pool.promise().query(userChatsQuery, [userId, chatId]);
    }
    await pool.promise().query(addMessageQuery, [chatId, message, sender]);
    await pool.promise().query(addMessageQuery, [chatId, data, "Nayvee"]);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to fetch Nayvee AI response.", errorMsg: error });
  }
};

module.exports = { chatController };
