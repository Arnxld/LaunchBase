const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "38f39989749dc4",
      pass: "71ee4aa0e5f1e9"
    }
  });
