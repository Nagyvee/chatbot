const { OAuth2Client } = require("google-auth-library");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const pool = require("../connectdb");

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

    pool.query(
      `SELECT * FROM chatbot_users WHERE email = ?`,
      [email],
      (err, results) => {
        if (err){
          console.log(err)
          return res.status(500).json({ status: false, msg: "Server error. Please try again" });
        }
        if (results.length > 0) {
          const user = results[0];
          const jwtToken = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image_url,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("chat_tkn", jwtToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
          return res.status(200).send({ status: true, token: jwtToken });
        }
        pool.query(insertQuery, [userid, email, name, image], (err, result) => {
          if (err){
            console.log(err)
            return res.status(500).json({ status: false, msg: "Server error. Please try again" });
          }
          const userId = results.insertId; // auto-incremented ID
          const jwtToken = jwt.sign(
            { userId, email, name, image },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("chat_tkn", jwtToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
          return res.status(200).send({ status: true, token: jwtToken });
        });
      }
    );
  } catch (error) {
    return res.status(400).json({status: false, msg: "Invalid ID token"});
  }
};

module.exports = verifyGoogleToken;
