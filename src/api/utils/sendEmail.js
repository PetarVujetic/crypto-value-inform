const nodemailer = require("nodemailer");

module.exports = async function sendActivationMail(contact) {
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
    subject: `${contact.message}`, // Subject line
    text: `${contact.message}`, // plain text body
    html: `<h1> </h1>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}