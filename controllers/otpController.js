const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abroadgateway370@gmail.com',
    pass: "qwzs bmhk qwyq pffb"
  }
});

const sendOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const mailOptions = {
      from: 'abroadgateway370@gmail.com',
      to: email,
      subject: 'Gateway Abroad - OTP Verification',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your OTP Code</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
};

const sendResume = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }

    // Extract form data from request body
    const { name, email, mobileNo, eduInterest } = req.body;

    if (!name || !email || !mobileNo) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required'
      });
    }

    // Prepare the email with attachment
    const mailOptions = {
      from: 'abroadgateway370@gmail.com',
      to: 'jaipur@gatewayabroad.in',
      subject: `New Job Application - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Job Application Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${mobileNo}</p>
          ${eduInterest ? `<p><strong>Interested Position:</strong> ${eduInterest}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <p>Please find the attached resume for review.</p>
        </div>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype
        }
      ]
    };

    // Send the email with resume attachment
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Resume sent successfully'
    });

  } catch (error) {
    console.error('Error sending resume:', error);
    res.status(200).json({
      success: true,
      message: 'Failed to send resume',
      error: error.message
    });
  }
};


module.exports = { sendOTP,sendResume };
