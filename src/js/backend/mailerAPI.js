const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

function sendEmail(from, to, content) {
	const mailAccountUser = "testmailacc026@gmail.com",
		mailAccountPassword = "cDskxCWX5kB9jU617TX7S081",
		fromUserName = from,
		toEmailAddress = to;

	const transport = nodemailer.createTransport(smtpTransport({
		tls: { rejectUnauthorized: false },
		service: "gmail",
		auth: { user: mailAccountUser, pass: mailAccountPassword }
	}));

	const mail = {
		from: `${fromUserName} <${mailAccountUser}>`,
		to: toEmailAddress,
		subject: "Send Email Using Node.js",
		text: content,
		//	html: `<b>Hello!</b><p><a href="https://www.google.com">Click Here</a></p>`
	}

	transport.sendMail(mail, (error, response) => {
		console.log(error ? error : `Message sent: ${response.message}`);
		transport.close();
	});
}

module.exports = sendEmail;