const crypto = require('crypto');
const nodemailer = require("nodemailer");

const config = require('./config')

const mailOptions = {
    from: config.email.from,
    to: "mithukayal78@gmail.com",
    subject: "test mail from node",
    text: "This is test mail. Do not reply.",
    html: '<b>NodeJS Email Test</b>'
}

async function sendMail() {
    // support https://nodemailer.com/about/

    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: decrypt(config.email.user),
            pass: decrypt(config.email.userkey)
        }
        // host: "smtp.gmail.com"
    });
    
    // smtpTransport.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         return console.log('mail send failed: ', error);
    //     } else {
    //         console.log('Message %s sent: %s', info.messageId, info.response);
    //         // res.end("Message sent successfully: " + response);
    //     }
    // });
}

function encrypt(text) {
    var cipher = crypto.createCipher(config.encrypt.algorithm, config.encrypt.password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}
   
  function decrypt(text) {
      var decipher = crypto.createDecipher(config.encrypt.algorithm, config.encrypt.password)
      var dec = decipher.update(text, 'hex', 'utf8')
      dec += decipher.final('utf8');
      return dec;
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

module.exports = { sendMail, encrypt, decrypt };