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

app.post("/submit-form", async (req, res) => {
    console.log("Route HIT!!!!")
    console.log("Raw Body:", req.body)
    const { firstName, lastName, email, phone } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",  
        port: 465,
        secure: true,
        tls: {
            rejectUnauthorized: false,
        },
        debug: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD, 
        },
        logger: true,
        debug: true,
    });

    

    const mailOptions = {
        from: email,
        to: "casey@libertygoldus.com",
        subject: "New Consultation Request",
        text: `You received a new consultation request:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true }); // Send JSON response
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: "Failed to send email." }); // Send JSON error response
    }
});

// start server

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});





