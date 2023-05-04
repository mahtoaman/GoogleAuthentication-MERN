const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const userDB = require("./userModel"); // assuming you have a separate module for your user database
require("dotenv").config();

const app = express();

const { CLIENT_ID, CLIENT_SECRET, JWT_SECRET, MONGODB_URI, PORT } = process.env;

const client = new OAuth2Client(CLIENT_ID);

app.use(express.json());

// app.post("/authenticate-google-user", async (req, res) => {
//     console.log('hiii')
//   try {
//     const { id_token } = req.body;
//     console.log(id_token)

//     const ticket = await client.verifyIdToken({
//       idToken: id_token,
//       audience: CLIENT_ID,
//     });

//     const { name, email, picture, sub } = ticket.getPayload();

//     const existingUser = await userDB.findOne({ email });
//     if (!existingUser) {
//       const newUser = {
//         email: email,
//         userProfileImageUrl: picture,
//         name: name,
//         googleId: sub,
//       };

//       let googleUserCreated = await userDB.create(newUser);

//       const token = jwt.sign({ id: googleUserCreated._id }, JWT_SECRET);

//       const result = {
//         googleUserCreated,
//         token,
//       };
//       return res.status(201).send(result);
//     } else {
//       const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
//       const result = {
//         existingUser,
//         token,
//       };

//       return res.status(200).send(result);
//     }
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// });

async function verify(client, token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  // console.log(payload)
  return payload;
  // const userid = payload["sub"];
}
console.log(CLIENT_ID)

app.get("/authenticate", async (req, res) => {
  const token = req.query.id_token;
  const client = new OAuth2Client(CLIENT_ID);
  var x =await verify(client, token).catch(console.error);
  console.log("========================================================================")
  console.log(x)
  res.send(x);
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
