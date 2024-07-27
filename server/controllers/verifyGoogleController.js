const { OAuth2Client } = require("google-auth-library");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const pool = require("../connectdb");
const { logInSuccess } = require("./createAccount");

const client = new OAuth2Client(process.env.GOOGLE_AUTH);

const verifyGoogleToken = async (req, res) => {
  const data = req.body;
  const token = data.id_token;
  const insertQuery = `INSERT INTO chatbot_users(google_id,email,name,image_url) VALUES(?,?,?,?)`;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];
    const image = payload["picture"];

    const existingUser = await pool
      .promise()
      .query(`SELECT * FROM chatbot_users WHERE email =?`, [email]);

    if (existingUser[0].length > 0) {
      const user = existingUser[0][0];
      const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image_url,
      };

      return logInSuccess(req, res, jwtPayload);
    }

    await pool.promise().query(insertQuery, [userid, email, name, image]);
    const userDetails = await pool
      .promise()
      .query(`SELECT * FROM chatbot_users WHERE email =?`, [email]);
    const user = userDetails[0][0];
    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image_url,
    };

    return logInSuccess(req, res, jwtPayload);
  } catch (error) {
    return res.status(400).json({ status: false, msg: "Invalid ID token" });
  }
};

module.exports = verifyGoogleToken;
