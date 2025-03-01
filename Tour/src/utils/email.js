/*import nodemailer from 'nodemailer';

const sendEmail = async options => {
    try{
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
   const info = await transporter.sendMail(mailOptions) 
   return info

    }catch(error){
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Email sending failed');

    }
  
}


 export default sendEmail; */
import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT), // Convert to number
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'Egwaoje Daniel <hello@daniel.io>',
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        console.log("📧 Sending email...");
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error("❌ email sending failed")
        console.error("❌ Full Error:", error);
        console.error("❌ Error Message:", error.message);
        console.error("❌ Error Code:", error.code);
        throw new Error('Failed to send email.');
    }
};

export default sendEmail;
