require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.json({ Message: true });
});

app.get('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  transporter
    .sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: 'marcelo_sp5@hotmail.com',
      subject: 'Email de teste',
      text: 'Se conseguiu ler essa mensagem, é porque deu certo! yay'
    })
    .then(info => {
      res.json({ EmailSent: info });
    })
    .catch(error => {
      res.json({ Error: error });
    });
});

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
