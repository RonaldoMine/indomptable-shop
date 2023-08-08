require('dotenv').config();
let nodemailer = require('nodemailer')
const USERNAME = process.env["MAIL_USERNAME"]
const PASSWORD = process.env["MAIL_PASSWORD"]
export const TRANSPORTER = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: USERNAME,
        pass: PASSWORD
    },
    secure: true
})

