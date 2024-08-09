const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST, // 1
    port: process.env.SMTP_PORT, // 2
    secure: false,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    // send the mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Email send: ", info.response);
  } catch (error) {
    console.log("Error in sending email: ", error);
  }
};

module.exports = sendEmail;
