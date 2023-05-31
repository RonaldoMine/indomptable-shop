require('dotenv').config();
let nodemailer = require('nodemailer')
const HOST = process.env["MAIL_HOST"]
const PORT = process.env["MAIL_POST"]
const USERNAME = process.env["MAIL_USERNAME"]
const PASSWORD = process.env["MAIL_PASSWORD"]
export const TRANSPORTER = nodemailer.createTransport({
    port: PORT,
    host: HOST,
    auth: {
        user: USERNAME,
        pass: PASSWORD
    },
    secure: false
})

