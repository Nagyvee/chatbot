const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../connectdb");

const createAcc = (req, res) => {
  const { name, email, password } = req.body;
  const CreateQuery = `INSERT INTO chatbot_users(name,email,password) VALUES(?,?,?)`;

  pool.query(
    `SELECT * FROM chatbot_users WHERE email = ?`,
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ status: false, msg: "server error" });
      }
      if (results.length > 0) {
        return res.status(400).json({
          status: false,
          msg: "email is already registered. Please login to continue",
        });
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ status: false, msg: "server error. Please try again." });
        }
        pool.query(CreateQuery, [name, email, hash], (err, results) => {
          if (err) {
            return res.status(500).json({ status: false, msg: "server error. Please try again." });
          }
          const userId = results.insertId;
          jwt.sign({userId, name,email}, process.env.JWT_SECRET,  { expiresIn: "1h" }, (err, token) => {
            if (err){
              return res.status(500).json({ status: false, msg: "server error. Please try again." });
            }
            res.cookie("chat_tkn", token, {
              maxAge: 60 * 60 * 1000,
              httpOnly: true,
            });
           return res.status(200).json({ status: true, token });
          });
        });
      });
    }
  );
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const query = `SELECT * FROM chatbot_users WHERE email = ?`;

  pool.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ status: false, msg: "false" });
    if (results.length === 0){
      return res.status(400).json({ status: false, msg: "account does not exist." });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) res.status(500).json({ status: false, msg: "server error. Please try again." });
      if (!isMatch){
        return res.status(400).json({ status: false, msg: "You entered wrong Password." });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
        if (err){
          return res.status(500).json({ status: false, msg: "server error. Please try again." });
        }
        res.cookie("chat_tkn", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
       return res.status(200).json({ status: true, token });
      });
    });
  });
};

module.exports = {createAcc, loginUser}
