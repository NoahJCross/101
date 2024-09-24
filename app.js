const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

const mailOptions = {
  from: {
    name: "Noah Cross",
    address: process.env.USER,
  },
  to: null,
  subject: "Welcome",
  text: "Welcome to my website",
};

app.post("/newsletter-signup", (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send(`Email is required`);
    }
    if (users.find((user) => user.email == email)) {
      return res.status(409).send("User already signed up");
    }
    const newUser = { email, data: new Date() };
    users.push(newUser);
    sendMail(mailOptions, email);
    res.status(201).send("signed up successfully");
  } catch (error) {
    console.error("Error in /newsletter-signup:", error);
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (mailOptions, email) => {
  return new Promise((resolve, reject) => {
    mailOptions["to"] = email;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return reject(error);
      }
      console.log("Email has been sent successfully:", info.response);
      resolve(info);
    });
  });
};
