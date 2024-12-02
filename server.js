const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config();


const app = express();
const port = 3000;

// middleware to parse form data

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// server static files
app.use(express.static("public"))

// endpoint to handle form submission

console.log("EMAIL:", process.env.EMAIL);
console.log("PASSWORD:", process.env.PASSWORD);

app.post("/submit-form", async(req, res) => {
    console.log("Route HIT!!!!")
    console.log("Raw Body:", req.body)
    const { firstName, lastName, email, phone } = req.body;
    
    

    // zjyx pjge ihrx spwq

    // configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    })

    const mailOptions = {
        from: email,
        to: "wettems35@gmail.com",
        subject: "New Consultation Request",
        text: `You received a new consultation request:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(`<h1>Thank you! We will reach out to you as soon as possible. </h1>`);
    } catch(error){
        console.error("Error sending email:", error);
        res.status(500).send(`<h1>Something went wrong. Please try again later. </h1>`);
    }
});

// start server

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

