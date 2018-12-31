module.exports = { isExist, addUser, sendEmail, sendSMS };

function isExist(newUser, storage) {
	return storage.some(user => {
		user = JSON.parse(JSON.stringify(user));
		delete user.id;
		console.log(newUser)
		return JSON.stringify(user) === JSON.stringify(newUser);
	});
}

function addUser(user, storage) {
	const lastId = storage[storage.length - 1].id;
	user.id = lastId + 1;
	storage.push(user);
}


//-----------------------------------------------------------

const nodemailer = require("nodemailer");
let smtpTransport = require("nodemailer-smtp-transport");

function sendEmail(from, to, content) {
	let mailAccountUser = "testmailacc026@gmail.com",
		mailAccountPassword = "cDskxCWX5kB9jU617TX7S081",
		fromUserName = from,
		toEmailAddress = to;

	let transport = nodemailer.createTransport(smtpTransport({
		tls: { rejectUnauthorized: false },
		service: "gmail",
		auth: { user: mailAccountUser, pass: mailAccountPassword }
	}));

	let mail = {
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


//------------------------------------------------------------------------

let SMSru = require('sms_ru'),
	sms = new SMSru('2A8A0FE3-4B77-7F88-D8C7-FED819C5D62B');


function sendSMS(text, num = '79611236308') {
	sms.sms_send({ to: num, text: text }, console.log);
	sms.my_limit(e => console.log("limit", `${e.current} / ${e.total}`));
}