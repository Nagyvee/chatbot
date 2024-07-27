const pool = require('../connectdb')

const userHistory = async (req, res) => {
  const { userId } = req.body;

  const chatsQuery = `SELECT chatbot_chats.id, chatbot_chats.time_created, chatbot_chats.topic FROM chatbot_chats 
INNER JOIN user_chats ON user_chats.chat_id = chatbot_chats.id WHERE user_id = ? ORDER BY chatbot_chats.time_created DESC`;

  const countQuery = `SELECT chatbot_messages.chat_id, COUNT(*) FROM chatbot_messages 
INNER JOIN chatbot_chats ON chatbot_chats.id = chatbot_messages.chat_id 
INNER JOIN user_chats ON user_chats.chat_id = chatbot_chats.id WHERE user_id = ? AND chatbot_messages.sender = 'user'
GROUP BY chatbot_messages.chat_id;`;

  try {
    const chatsData = await pool.promise().query(chatsQuery, [userId]);
    const countsData = await pool.promise().query(countQuery, [userId]);
    const chats = chatsData[0];
    const counts = countsData[0];
    const historyAndCount = []

    if(counts.length > 0){
   const data = chats.forEach((chat) => {
     messageCount = counts.find((count) => count.chat_id === chat.id);
     historyAndCount.push({
        ...chat,
       askedQuestionsCount: messageCount['COUNT(*)']
     })
    });
}

    res.status(200).json({
      status: true,
      data: historyAndCount,
      msg: "User History fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

module.exports = {userHistory};