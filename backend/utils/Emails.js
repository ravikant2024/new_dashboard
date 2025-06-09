const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'mail.orginv8.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3'
}
});

exports.sendMail = async(receiverEmail,subject,body) => {
    await transporter.sendMail({
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: subject,
    html: body
  });
};
