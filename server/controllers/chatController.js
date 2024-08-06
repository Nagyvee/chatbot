const fetchOpenAIResponse = require("../openai");
const pool = require("../connectdb");

const chatController = async (req, res) => {
  const { userId, history, sender, message, chatId } = req.body;

  try {
    if (history.length === 0 || history === undefined) {
      const chatQuery = `INSERT INTO chatbot_chats(id,topic) VALUES(?,?)`;
      const userChatsQuery = `INSERT INTO user_chats(user_id,chat_id) VALUES(?,?)`;

      await pool.promise().query(chatQuery, [chatId, message]);
      await pool.promise().query(userChatsQuery, [userId, chatId]);
    }

    const addMessageQuery = `INSERT INTO chatbot_messages(chat_id,content, sender) VALUES(?,?,?)`;

    const data = await fetchOpenAIResponse(history, message);
    await pool.promise().query(addMessageQuery, [chatId, message, sender]);
    await pool.promise().query(addMessageQuery, [chatId, data, "Nayvee"]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch Nayvee AI response.", errorMsg: error });
    consoile.log(error);
  }
};

module.exports = { chatController };
