import nodemailer from 'nodemailer'
const sendEmail = async options => {
    //create a transporter
    const transporter = nodemailer.createTransport({
        //?service: "Gmail",
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
        
    })
        // Define the email options
    const mailOptions = {
        from : 'Egwaoje Daniel <hello@daniel.io>',
        to: options.email,
        subject:options.subject,
        text:options.message
    }
    // actually sent the mail
   await transporter.sendMail(mailOptions) 
}


export default sendEmail;