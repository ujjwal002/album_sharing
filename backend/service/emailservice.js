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

async function sendPasswordResetEmail(email, token) {
  const resetLink = `http://localhost:4200/resetpassword?token=${token}`;

  const mailOptions = {
    from: "ujjwalsingrajput2000@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: ` 
    hey you have successfully generated the password reset link and passoword reset link is below
      ${resetLink}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(
      `Password reset email sent to ${email}.`
    );
  } catch (error) {
    console.error(`Failed to send password reset email to ${email}`);
    console.log(error.message);
  }
}

module.exports = sendPasswordResetEmail;
