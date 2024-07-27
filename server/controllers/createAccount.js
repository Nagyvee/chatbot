const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../connectdb");

const createAcc = async (req, res) => {
  const { name, email, password } = req.body;
  const CreateQuery = `INSERT INTO chatbot_users(name,email,password) VALUES(?,?,?)`;

  try {
    const results = await pool
      .promise()
      .query(`SELECT * FROM chatbot_users WHERE email = ?`, [email]);
    console.log(results);

    if (results[0].length > 0) {
      return res.status(400).json({
        status: false,
        msg: "email is already registered. Please login to continue",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    await pool.promise().query(CreateQuery, [name, email, hash]);
    const userDetails = await pool
      .promise()
      .query(`SELECT * FROM chatbot_users WHERE email =?`, [email]);
    const user = userDetails[0][0];
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    logInSuccess(req, res, payload);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "server error. Please try again." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM chatbot_users WHERE email = ?`;

  try {
    const results = await pool.promise().query(query, [email]);
    const user = results[0][0];
    console.log(user);

    if (results[0].length === 0) {
      return res
        .status(400)
        .json({ status: false, msg: "account does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, msg: "You entered wrong Password." });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    logInSuccess(req, res, payload);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "server error. Please try again." });
  }
};

const logInSuccess = async (req, res, payload) => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("chat_tkn", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ status: true, token });
  } catch (error) {
    return res.status(200).json({ status: true, token });
  }
};

module.exports = { createAcc, loginUser, logInSuccess };
