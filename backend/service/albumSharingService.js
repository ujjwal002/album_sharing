const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ujjwalsinghrajput2000@gmail.com',
    pass: 'utfbjafzozrsdsdl',
  },
});

async function sendEmail(email, albumName) {
  // http://localhost:4200/shared/2
  const resetLink = `http://localhost:4200/shared/${albumName}`;

  const mailOptions = {
    from: "ujjwalsingharcsinfotech@gmail.com",
    to: email,
    subject: "Album shared ",
    text: ` 
    hey someone shared you link to add image in their album
      ${resetLink}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      ` email sent to ${email}. Message ID: ${info.messageId}`
    );
  } catch (error) {
    console.error(`Failed to send  email to ${email}: ${error}`);
    throw error;
  }
}

module.exports = sendEmail;
