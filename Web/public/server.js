// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

// Handle Contact Form Submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail or any other service
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // Replace with your email
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/autoparts', { useNewUrlParser: true, useUnifiedTopology: true });
// Handle Quote Form Submission
// app.post('/quote', (req, res) => {
    // const { name, email, phone, year, make_model, part } = req.body;

    // Save to database or send email (similar to contact form)
    // console.log('Quote Request:', { name, email, phone, year, make_model, part });
    // res.status(200).send('Quote request received!');
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});