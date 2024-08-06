const pool = require("../connectdb");
const jwt = require("jsonwebtoken");

const userHistory = async (req, res) => {
  const { userId } = req.body;

  const chatsQuery = `SELECT chatbot_chats.id, chatbot_chats.time_created, chatbot_chats.topic FROM chatbot_chats 
INNER JOIN user_chats ON user_chats.chat_id = chatbot_chats.id WHERE user_id = ? ORDER BY chatbot_chats.time_created DESC`;

  const countQuery = `SELECT chatbot_messages.chat_id, COUNT(*) AS countNum FROM chatbot_messages 
INNER JOIN chatbot_chats ON chatbot_chats.id = chatbot_messages.chat_id 
INNER JOIN user_chats ON user_chats.chat_id = chatbot_chats.id WHERE user_id = ? AND chatbot_messages.sender = 'user'
GROUP BY chatbot_messages.chat_id`;

  try {
    const chatsData = await pool.promise().query(chatsQuery, [userId]);
    const countsData = await pool.promise().query(countQuery, [userId]);
    const chats = chatsData[0];
    const counts = countsData[0];
    const historyAndCount = [];

    if (counts.length > 0) {
      chats.forEach((chat) => {
        messageCount = counts.find((count) => count.chat_id === chat.id);
        historyAndCount.push({
          ...chat,
          askedQuestionsCount: messageCount.countNum,
        });
      });
    }

    res.status(200).json({
      status: true,
      data: historyAndCount,
      msg: "User History fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server Error", errorMsg: error });
  }
};

const selectSingleChat = async (req, res) => {
  const { chatId } = req.params;
  const query = `SELECT * FROM chatbot_messages WHERE chat_id =? ORDER BY id ASC`;

  try {
    const data = await pool.promise().query(query, [chatId]);
    return res.status(200).json({
      status: true,
      data: data[0],
      msg: "Chat fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

const deleteHistory = async (req, res) => {
  const userId = req.params.chatId;
  const query = `DELETE FROM user_chats WHERE user_id =?`;
  try {
    const data = await pool.promise().query(query, [userId]);
    console.log(data);
    return res
      .status(200)
      .json({ status: true, msg: "Chat history deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

const logOutUser = async (req, res) => {
  const token = req.cookies.chat_tkn;
  if (!token) {
    return res.status(401).json({ status: false, msg: "No token provided" });
  }
  try {
    const tokenResults = await jwt.verify(token, process.env.JWT_SECRET);
    const tokenExpDate = tokenResults.exp;

    await pool
      .promise()
      .query(`INSERT INTO deactivated_tokens (token, exp_date) VALUES(?,?)`, [
        token,
        tokenExpDate,
      ]);
    res.clearCookie("chat_tkn");
    res.status(200).json({ status: true, msg: "User logged out successfully" });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ status: false, msg: "Error logging out. Please try again." });
    return;
  }
};

const getMembers = async (req, res) => {
  const query = `SELECT * FROM chatbot_users LIMIT 10`;

  try {
    const data = await pool.promise().query(query);
    const count = await pool
      .promise()
      .query(`SELECT COUNT(*) As countNum FROM chatbot_users`);
    if (data.legth < 1) {
      return res.status(200).json({
        status: true,
        data: [],
      });
    }
    let members = [];

    data[0].forEach((member) => {
      members.push({
        name: member.name,
        image: member.image_url,
        id: member.id,
      });
    });
    res.status(200).json({
      status: true,
      members,
      totalMembers: count[0][0].countNum,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: "Server error",
    });
    console.log(err);
  }
};

const updateProfile = async (req, res) => {
  const token = req.cookies.chat_tkn;
  const { id, name } = req.body;
  if (!token) {
    return res.status(401).json({ status: false, msg: "No token provided" });
  }

  const jwtSecret = process.env.JWT_SECRET;
  const validToken = await jwt.verify(token, jwtSecret);
  const timeDiff = validToken.exp - validToken.iat;

  const userPayload = {
    id: validToken.id,
    email: validToken.email,
    name,
    image: validToken.image,
  };

  try {
    await pool
      .promise()
      .query(`UPDATE chatbot_users SET name = ?  WHERE id = ?`, [name, id]);
    const newToken = await jwt.sign(userPayload, jwtSecret, {
      expiresIn: timeDiff,
    });
    res.cookie("chat_tkn", newToken, {
      maxAge: timeDiff * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ status: true, token: newToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      msg: "Server Error",
    });
  }
};

module.exports = {
  userHistory,
  selectSingleChat,
  deleteHistory,
  logOutUser,
  getMembers,
  updateProfile,
};
