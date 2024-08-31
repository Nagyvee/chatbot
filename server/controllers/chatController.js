const {fetchOpenAIResponse, imageGenerate} = require("../openai");
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
      if(message.length > 60){
        topicContent = message.slice(0, 60) + '...';
      }else{
        topicContent = message;
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
      .json({ error: "Failed to fetch Nayvee AI response."});
  }
};

const imageController = async (req, res) =>{
  const { userId, sender, message } = req.body;
  const imagesNumQuery = `SELECT * FROM user_chats_images
        WHERE time >= UNIX_TIMESTAMP(CURDATE()) * 1000 AND user_id = ? AND sender = ?`;
  const addMessageQuery = `INSERT INTO user_chats_images(user_id,content, sender, time) VALUES(?,?,?,?)`;


  try {
    const imagesNumber = await pool.promise().query(imagesNumQuery, [userId, 'Nayvee']);

    if(imagesNumber[0].length >= 3){
      return res
      .status(401)
      .json({ error: "You have reached your daily limit."});
    }

    const data = await imageGenerate(message);

    await pool.promise().query(addMessageQuery, [userId, message, sender, Date.now()]);
    await pool.promise().query(addMessageQuery, [userId, data, "Nayvee", Date.now()]);
    res.status(200).json(data);
  }catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch Nayvee AI response."});
  }
}

module.exports = { chatController, imageController };
