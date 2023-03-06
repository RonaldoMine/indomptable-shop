require('dotenv').config();
let nodemailer = require('nodemailer')
const HOST = process.env["mail-host"]
const PORT = process.env["mail-port"]
const USERNAME = process.env["mail-username"]
const PASSWORD = process.env["mail-password"]
export const TRANSPORTER = nodemailer.createTransport({
    port: PORT,
    host: HOST,
    auth: {
        user: USERNAME,
        pass: PASSWORD
    },
    secure: false
})

