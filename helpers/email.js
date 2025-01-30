const {SESClient, SendEmailCommand} = require('@aws-sdk/client-ses');

const client = new SESClient({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
});

exports.sendWelcomeEmail = async (email) => {
  const params = {
    Source: process.env.EMAIL_FROM,
    ReplyToAddresses: [process.env.EMAIL_TO],
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <body>
                <h1>Welcome to ${process.env.APP_NAME}</h1>
                <p>You have successfully signed up for our app</p>
                <div style="margin:20px auto;">
                  <a href="${process.env.CLIENT_URL}">Browse access to API</a>
                  <a href="${process.env.CLIENT_URL}/post-ad">Post your own ad</a>
                </div>
              </body>
            </html>
          `
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Welcome to ${process.env.APP_NAME}`
      },
    }
  };

  const command = new SendEmailCommand(params);

  try {
    const data = await client.send(command);
    return data;
  } catch (error) {
    throw error;
  }
}
