const { sendWelcomeEmail } = require('../helpers/email');

exports.login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const data = await sendWelcomeEmail(email);
    return res.json({
      message: 'welcome email sent please follow the instructions.',
      data
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Could not send welcome email',
      error
    })
  }
}
