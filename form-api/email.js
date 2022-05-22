const nodemailer = require("nodemailer")

async function email(bodyObj, files) {

  const body = JSON.parse(JSON.stringify(bodyObj));
  console.log(body)

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  const addresses = {
    "airbus": "airbus@lemonmind.com",
    "boeing": "boeing@lemonmind.com",
  }

  let adressTo = body.to === "Airbus A380" ? addresses.airbus : addresses.boeing

  let info = await transporter.sendMail({
    from: '<api@example.com>',
    to: adressTo,
    subject: "Form",
    text: JSON.stringify(body), // plain text body
    html: JSON.stringify(body), // html body
    attachments: files.map(file => {
      const fileAttachment = {
        path: file.path,
      }
      return fileAttachment
    })
  });

  console.log("Message sent: %s", info.messageId);

  return info

}

module.exports = email;