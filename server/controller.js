const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);
require("dotenv").config();
const { CLIENT_ID, CLIENT_SECRET } = env.process;

exports.authenticateGoogleUser = async (req, res) => {
  try {
    const { id_token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: CLIENT_ID,
    });

    const { name, email, picture, sub } = ticket.getPayload();

    const existingUser = await userDB.findOne({ email });
    if (!existingUser) {
      const newUser = {
        email: email,
        userProfileImageUrl: picture,
        name: name,
        googleId: sub,
      };

      let googleUserCreated = await userDB.create(newUser);

      const token = jwt.sign({ id: googleUserCreated._id }, JWT_SECRET);

      const result = {
        googleUserCreated,
        token,
      };
      return res.status(201).send(result);
    } else {
      const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
      const result = {
        existingUser,
        token,
      };

      return res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
