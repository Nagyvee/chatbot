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
        if (messageCount.countNum !== undefined) {
          historyAndCount.push({
            ...chat,
            askedQuestionsCount: messageCount.countNum,
          });
        }
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

const getImagesChat = async (req, res) => {
  const { userId } = req.body;
  const query = `SELECT user_chats_images.id, 
user_chats_images.content, user_chats_images.sender, user_chats_images.time 
FROM user_chats_images
INNER JOIN chatbot_users ON chatbot_users.id = user_chats_images.user_id
 WHERE user_id = ? AND time > UNIX_TIMESTAMP(NOW() - INTERVAL 1 HOUR) * 1000`;

  const usageQuery = `SELECT COUNT(*) As countNum FROM user_chats_images
WHERE time >= UNIX_TIMESTAMP(CURDATE()) * 1000 AND user_id = ? AND sender = ?`;

  try {
    const sqlData = await pool.promise().query(query, userId);
    const usageData = await pool
      .promise()
      .query(usageQuery, [userId, "Nayvee"]);
    const usage = usageData[0][0];
    const data = sqlData[0];

    return res.status(200).json({
      status: true,
      data: data,
      dailyUsage: usage.countNum,
      msg: "Chat fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

const deletePreviousImages = async () => {
  const query = `DELETE FROM user_chats_images
  WHERE time < UNIX_TIMESTAMP(NOW() - INTERVAL 2 DAY) * 1000`;

  try {
    await pool.promise().query(query);
    console.log("deleted successfully");
    return;
  } catch (error) {
    console.error("Error deleting chat history:", error);
    return;
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
  const query = `SELECT * FROM chatbot_users ORDER BY name`;

  try {
    const data = await pool.promise().query(query);
    const count = await pool
      .promise()
      .query(`SELECT COUNT(*) As countNum FROM chatbot_users`);
    if (data.length < 1) {
      return res.status(200).json({
        status: true,
        data: [],
      });
    }
    let members = [];

    data[0].forEach((member) => {
      const dateStr = member.created_at;
      const date = new Date(dateStr);

      const options = { year: "numeric", month: "short" };
      const formattedDate = date.toLocaleDateString("en-US", options);
      members.push({
        name: member.name,
        image: member.image_url,
        id: member.id,
        joined: formattedDate,
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

const downLoadImage = async (req, res) => {
  const { fileUrl } = req.body;
  const fileName = `nayvee-chat-generated-${Date.now()}.png`;

  // Make an HTTP request to get the image
  const https = require("https");
  https
    .get(fileUrl, (fileRes) => {
      // Set headers to prompt download
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );
      res.setHeader("Content-Type", "image/png");

      // Pipe the image response to the client
      fileRes.pipe(res);
    })
    .on("error", (err) => {
      res.status(500).send("Error fetching the file");
    });
};

module.exports = {
  userHistory,
  selectSingleChat,
  deleteHistory,
  logOutUser,
  getMembers,
  updateProfile,
  getImagesChat,
  deletePreviousImages,
  downLoadImage,
};
