const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Send booking confirmation email
const sendBookingConfirmation = async (userEmail, bookingDetails) => {
  try {
    const isConfirmed = bookingDetails.status === 'confirmed';
    const subject = isConfirmed ? 'Booking Confirmed - CarZone' : 'Booking Cancelled - CarZone';
    const statusColor = isConfirmed ? '#e8f5e8' : '#ffe8e8';
    const statusText = isConfirmed ? 'Confirmed' : 'Cancelled';
    const statusIcon = isConfirmed ? '✅' : '❌';
    
    const mailOptions = {
      from: `"CarZone" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; color: white; padding: 20px; text-align: center;">
            <h1>🚗 CarZone</h1>
            <h2>${statusIcon} Booking ${statusText}!</h2>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h3>Dear ${bookingDetails.userName},</h3>
            <p>Your car booking has been ${statusText.toLowerCase()}. Here are your booking details:</p>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4>🚙 Car Details</h4>
              <p><strong>Car:</strong> ${bookingDetails.carName}</p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4>📅 Rental Details</h4>
              <p><strong>Pickup Date:</strong> ${new Date(bookingDetails.pickupDate).toLocaleDateString()}</p>
              <p><strong>Return Date:</strong> ${new Date(bookingDetails.returnDate).toLocaleDateString()}</p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4>💰 Payment Details</h4>
              <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
            </div>
            
            <div style="background: ${statusColor}; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h4>📋 ${isConfirmed ? 'Important Notes' : 'Cancellation Notice'}</h4>
              ${isConfirmed ? `
                <ul>
                  <li>Please carry a valid driving license</li>
                  <li>Arrive 15 minutes before pickup time</li>
                  <li>24/7 roadside assistance included</li>
                </ul>
              ` : `
                <p>We regret to inform you that your booking has been cancelled. If you have any questions, please contact our support team.</p>
              `}
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <p>Need help? Contact us at <strong>support@carzone.com</strong> or call <strong>+91-9999999999</strong></p>
            </div>
          </div>
          
          <div style="background: #000; color: white; padding: 15px; text-align: center;">
            <p>Thank you for choosing CarZone!</p>
            <p style="font-size: 12px;">This is an automated email. Please do not reply.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Booking ${statusText.toLowerCase()} email sent:`, result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error(`Error sending booking ${bookingDetails.status} email:`, error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendBookingConfirmation
};