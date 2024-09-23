import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6969;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASS;

app.post('/user', async (req, res) => {
    console.log(req.body);
  
    const { name, email, message } = req.body;

    const ThankYouMessage = `
     Dear ${name},

     A big THANK YOU for getting in touch with us! We have received your message, and we truly appreciate you taking the time to reach out.

     Here are the details you provided:

     Name: ${name}
     Email: ${email}
     Your Message: ${message}

     We will review your message and get back to you as soon as possible. If you need immediate assistance, feel free to contact us at support@example.com.

     Thank you once again for your message! We look forward to assisting you.

     Best regards,
     Ratnakar Giri
    `;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        const mailOptions = {
            from: EMAIL,     
            to: email,        
            subject: `Welcome ${name}`,
            text: ThankYouMessage,
            html:  `
            <p>Dear <strong>${name}</strong>,</p>
            <p>A big <strong>THANK YOU</strong> for getting in touch with us! We have received your message, and we truly appreciate you taking the time to reach out.</p>
            <p><strong>Here are the details you provided:</strong></p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Your Message:</strong> ${message}</li>
            </ul>
            <p>We will review your message and get back to you as soon as possible. If you need immediate assistance, feel free to contact us at support@example.com.</p>
            <p>Thank you once again for your message! We look forward to assisting you.</p>
            <p>Best regards,<br>Pritiranjan Patra</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ message: 'Thank you email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send thank you email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
