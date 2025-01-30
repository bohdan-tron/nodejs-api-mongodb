const { sendWelcomeEmail } = require('../helpers/email');
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});

    if (!user) {
      try {
        const createdUser = await User.create({
          email, 
          password: await hashPassword(password),
          username: nanoid(6),
        });

        await sendWelcomeEmail(email);

        const token = jwt.sign(
          {_id: createdUser._id},
          process.env.JWT_SECRET,
          {expiresIn: '7d'}
        )

        createdUser.password = undefined;

        res.json({
          token,
          user: createdUser,
        })
      } catch (error) {
        console.log(error);
        return res.json({error: 'Invalid credentials'});
      }
    } else {
      // compare pass before login
      const match = await comparePassword(password, user.password);

      if (!match) {
        return res.json({error: 'Invalid credentials'});
      } else {
        const token = jwt.sign(
          {_id: user._id},
          process.env.JWT_SECRET,
          {expiresIn: '7d'}
        )

        user.password = undefined;

        res.json({
          token,
          user,
        })
      }
    }

  } catch (error) {
    console.log("Login error", error);
    res.json({error: 'Try again later'});
  }
}
