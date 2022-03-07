const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

let to;
let subject;
let body;

app.post('/sendmail', (req, res) => {
	to = req.body.to;
	subject = req.body.subject;
	body = req.body.body;
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'ashveertest@gmail.com',
			pass: process.env.EMAIL_PASS,
		},
	});

	let mailOptions = {
		from: 'ashveertest@gmail.com',
		to: to,
		subject: subject,
		text: body,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
});

app.get('/', (req, res) => {
	res.send('Server is running');
});

io.on('connection', (socket) => {
	socket.emit('me', socket.id);

	socket.on('disconnect', () => {
		socket.broadcast.emit('callEnded');
	});

	socket.on('callUser', ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit('callUser', { signal: signalData, from, name });
	});

	socket.on('answerCall', (data) => {
		io.to(data.to).emit('callAccepted', data.signal);
	});
});



server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
