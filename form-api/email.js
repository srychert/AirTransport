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

  let adressTo = body.airplane === "Airbus A380" ? addresses.airbus : addresses.boeing

  const { documents, cargos, ...rest } = body
  const cargoHtml = JSON.parse(cargos).map(c => {
    return `<tr>
            <td>name:${c.name}&nbsp;</td>
            <td>weight:${c.weight}&nbsp;</td>
            <td>type:${c.type}&nbsp;</td>
            </tr>`
  }).join('');

  const cargoPlainText = JSON.parse(cargos).map(c => {
    return `name:${c.name} weight:${c.weight} type:${c.type}\n`
  }).join('');

  const emailHTml = `
    <p>from:${rest.from}</p>
    <p>to:${rest.to}</p>
    <p>airplane:${rest.airplane}</p>
    <table>
    <tbody>
    ${cargoHtml}
    </tbody>
    </table>`

  const emailPlainText = `
  from:${rest.from}

  to:${rest.to}

  airplane:${rest.airplane}

  ${cargoPlainText}`

  let info = await transporter.sendMail({
    from: '<api@example.com>',
    to: adressTo,
    subject: "Form",
    text: emailPlainText,
    html: emailHTml,
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