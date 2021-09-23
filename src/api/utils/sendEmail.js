const nodemailer = require("nodemailer");

module.exports = async function sendMail(contact, message) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"CryInform" <' + process.env.AUTH_USER + '>', // sender address
    to: contact.email, // list of receivers
    subject: `${message}`, // Subject line
    text: `${message}`, // plain text body
    html: `<h1> ${message} </h1>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
}