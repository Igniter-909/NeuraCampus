import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import config from '../config/config.js';
import logger from './logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Register Handlebars helpers
Handlebars.registerHelper('formatDate', function(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

Handlebars.registerHelper('uppercase', function(str) {
  return str ? str.toUpperCase() : '';
});

// Helper function to read email templates
const readHTMLFile = (path) => {
  try {
    return fs.readFileSync(path, { encoding: 'utf-8' });
  } catch (err) {
    console.error('Error reading HTML file:', err);
    throw err;
  }
};

/**
 * Send verification email to user
 * @param {string} to - Recipient email address
 * @param {string} name - Recipient name
 * @param {string} verificationToken - Token for email verification
 * @returns {Promise} - Nodemailer send mail promise
 */
export const sendVerificationEmail = async (to, name, verificationToken) => {
  try {
    // Path to email template
    const templatePath = path.join(__dirname, '../templates/verification-email.html');
    
    // Read the HTML template
    const html = readHTMLFile(templatePath);
    
    // Compile the template
    const template = Handlebars.compile(html);
    
    // Create verification link
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    
    // Replace placeholders with actual data
    const htmlToSend = template({
      name: name,
      verificationLink: verificationLink
    });
    
    // Email options
    const mailOptions = {
      from: `"${config.email.senderName}" <${config.email.user}>`,
      to: to,
      subject: 'Verify Your Email Address',
      html: htmlToSend
    };
    
    // Send email
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

/**
 * Send email using template and data
 * @param {Object} options - Email options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.template - Email template string
 * @param {Object} options.data - Data for template
 * @param {Array} options.attachments - Email attachments
 * @returns {Promise} - Nodemailer send result
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    
    // Test the connection
    await transporter.verify();
    logger.info('SMTP connection verified');

    const mailOptions = {
      from: `"${config.email.senderName}" <${config.email.user}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    logger.error('Email service error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Send batch emails
 * @param {Array} recipients - Array of recipient objects
 * @param {String} subject - Email subject
 * @param {String} template - Email template string
 * @param {Function} dataMapper - Function to map recipient to template data
 * @returns {Promise} - Results of all send operations
 */
export const sendBatchEmails = async (recipients, subject, template, dataMapper) => {
  try {
    const promises = recipients.map(recipient => {
      const data = dataMapper(recipient);
      return sendEmail({
        to: recipient.email,
        subject,
        template,
        data
      });
    });
    
    const results = await Promise.allSettled(promises);
    
    // Log results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    logger.info(`Batch email results: ${successful} sent, ${failed} failed`);
    
    return results;
  } catch (error) {
    logger.error('Error sending batch emails:', error);
    throw error;
  }
};

/**
 * Send verification status email to college
 * @param {string} to - Recipient email address
 * @param {string} collegeName - College name
 * @param {string} status - Verification status (approved/rejected)
 * @param {string} message - Optional message explaining the decision
 * @returns {Promise} - Nodemailer send mail promise
 */
export const sendVerificationStatusEmail = async (to, collegeName, status, message = '') => {
  try {
    // Create email content based on status
    const subject = status === 'approved' 
      ? 'College Verification Approved' 
      : 'College Verification Status Update';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>College Verification Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
          }
          .status-approved {
            color: #4CAF50;
            font-weight: bold;
          }
          .status-rejected {
            color: #f44336;
            font-weight: bold;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>College Verification Status Update</h2>
          <p>Dear ${collegeName},</p>
          <p>We are writing to inform you about the status of your college verification request.</p>
          <p>Your verification status: <span class="status-${status.toLowerCase()}">${status.toUpperCase()}</span></p>
          ${message ? `<p><strong>Additional information:</strong> ${message}</p>` : ''}
          ${status === 'approved' 
            ? '<p>Congratulations! Your college has been verified on our platform. You can now access all the features available to verified colleges.</p>' 
            : '<p>If you have any questions or need further assistance, please contact our support team.</p>'}
          <p>Thank you for your patience during this process.</p>
        </div>
        <div class="footer">
          <p>This is an automated message from our college verification system.</p>
        </div>
      </body>
      </html>
    `;
    
    // Email options
    const mailOptions = {
      from: `"${config.email.senderName}" <${config.email.user}>`,
      to: to,
      subject: subject,
      html: htmlContent
    };
    
    // Send email
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification status email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending verification status email:', error);
    throw error;
  }
};

export default {
  sendEmail,
  sendBatchEmails,
  sendVerificationEmail,
  sendVerificationStatusEmail
}; 