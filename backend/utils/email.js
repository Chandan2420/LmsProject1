const nodemailer = require('nodemailer');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another email service (e.g., Yahoo, Outlook)
    auth: {
        user: 'chandangowda2422@gmail.com', // Replace with your email
        pass: 'wwji mwpy wqlj brjs', // Replace with your email app password
    },
});

/**
 * Sends an email using the Nodemailer transporter.
 *
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Subject of the email
 * @param {string} options.text - Plain text body of the email
 * @param {string} [options.html] - HTML body of the email (optional)
 */
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const mailOptions = {
            from: 'chandangowda2422@gmail.com', // Sender email
            to, // Recipient email
            subject, // Email subject
            text, // Email body (plain text)
            html, // Email body (HTML, optional)
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendEmail };
