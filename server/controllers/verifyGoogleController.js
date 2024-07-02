const { OAuth2Client } = require('google-auth-library');
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_AUTH);

const verifyGoogleToken = async (req,res) => {
    const data = req.body
        const token = data.id_token

            try {
                const ticket = await client.verifyIdToken({
                  idToken: token,
                  audience: process.env.GOOGLE_AUTH,
                });
            
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                const email = payload['email'];
                const name = payload['name'];
                const image = payload['picture']

               const jwtToken = jwt.sign({userid,email,name,image},JWT_SECRET, {expiresIn: "1h"})
            
               res.cookie('chat_tkn',jwtToken,{maxAge: 60 * 60 * 1000, httpOnly: true})
               return res.status(200).send({status: true, token: jwtToken});
               
              } catch (error) {
                console.log(error)
               return res.status(400).send('Invalid ID token');
              }
  }

  module.exports = verifyGoogleToken